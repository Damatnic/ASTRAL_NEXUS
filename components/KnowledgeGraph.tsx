'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { buildKnowledgeGraph, WikiNode, WikiEdge } from '@/lib/wikilinks'

interface KnowledgeGraphProps {
  currentGuide?: string
  onNodeClick?: (nodeId: string) => void
}

interface SimNode extends WikiNode {
  x: number
  y: number
  vx: number
  vy: number
}

export default function KnowledgeGraph({ currentGuide, onNodeClick }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<WikiNode[]>([])
  const [edges, setEdges] = useState<WikiEdge[]>([])
  const [simNodes, setSimNodes] = useState<SimNode[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(currentGuide || null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    loadGraph()
  }, [])

  const loadGraph = async () => {
    const graphData = await buildKnowledgeGraph()
    setNodes(graphData.nodes)
    setEdges(graphData.edges)
  }

  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Physics simulation
    const simulation = createSimulation(nodes, edges)
    setSimNodes(simulation.nodes)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw edges
      edges.forEach(edge => {
        const source = simulation.nodes.find(n => n.id === edge.source)
        const target = simulation.nodes.find(n => n.id === edge.target)
        if (!source || !target) return

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        
        // Color based on edge type
        ctx.strokeStyle = getEdgeColor(edge.type)
        ctx.lineWidth = edge.strength * 2
        ctx.globalAlpha = 0.3
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // Draw nodes
      simulation.nodes.forEach(node => {
        const isHovered = node.id === hoveredNode
        const isSelected = node.id === selectedNode
        const isCurrent = node.id === currentGuide

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, getNodeRadius(node), 0, Math.PI * 2)
        
        if (isCurrent) {
          ctx.fillStyle = '#00ffcc'
        } else if (isSelected) {
          ctx.fillStyle = '#1affd5'
        } else if (isHovered) {
          ctx.fillStyle = '#66ffdd'
        } else {
          ctx.fillStyle = getNodeColor(node.type)
        }
        
        ctx.fill()
        
        // Node border
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = isHovered || isSelected ? 3 : 1
        ctx.stroke()

        // Node label
        ctx.fillStyle = '#ffffff'
        ctx.font = `${isHovered ? 14 : 12}px Inter, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.title, node.x, node.y + getNodeRadius(node) + 15)
      })

      // Update physics
      simulation.tick()
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [nodes, edges, hoveredNode, selectedNode, currentGuide])

  // Handle mouse interactions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find clicked node
    const clickedNode = simNodes.find(node => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2)
      return distance < getNodeRadius(node)
    })

    if (clickedNode) {
      setSelectedNode(clickedNode.id)
      onNodeClick?.(clickedNode.id)
    }
  }

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find hovered node
    const hoveredNode = simNodes.find(node => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2)
      return distance < getNodeRadius(node)
    })

    setHoveredNode(hoveredNode?.id || null)
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default'
  }

  return (
    <div className="relative w-full h-full glass-card rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasHover}
        onMouseLeave={() => setHoveredNode(null)}
      />
      
      {/* Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={() => setSelectedNode(null)}
          className="px-3 py-1 text-xs glass-card rounded hover:bg-white/10 transition-colors"
        >
          Clear Selection
        </button>
        <button
          onClick={loadGraph}
          className="px-3 py-1 text-xs glass-card rounded hover:bg-white/10 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card p-3 rounded text-xs">
        <div className="font-semibold mb-2">Edge Types</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span>Reference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-green-400"></div>
            <span>Related</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-yellow-400"></div>
            <span>Prerequisite</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-400"></div>
            <span>Extends</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-400"></div>
            <span>Contradicts</span>
          </div>
        </div>
      </div>

      {/* Node Info */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 glass-card p-3 rounded max-w-xs"
        >
          <div className="font-semibold text-primary mb-1">
            {nodes.find(n => n.id === hoveredNode)?.title}
          </div>
          <div className="text-xs text-gray-400">
            Connections: {nodes.find(n => n.id === hoveredNode)?.connections || 0}
          </div>
          <div className="text-xs text-gray-400">
            Type: {nodes.find(n => n.id === hoveredNode)?.type}
          </div>
          {(nodes.find(n => n.id === hoveredNode)?.tags?.length || 0) > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {nodes.find(n => n.id === hoveredNode)?.tags?.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-white/10 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

// Physics simulation
function createSimulation(nodes: WikiNode[], edges: WikiEdge[]) {
  // Simple force-directed graph layout
  const simNodes: SimNode[] = nodes.map(node => ({
    ...node,
    x: Math.random() * 800,
    y: Math.random() * 600,
    vx: 0,
    vy: 0
  }))

  return {
    nodes: simNodes,
    tick() {
      const alpha = 0.1
      const centerX = 400
      const centerY = 300

      // Apply forces
      simNodes.forEach((node, i) => {
        // Center force
        node.vx += (centerX - node.x) * alpha * 0.01
        node.vy += (centerY - node.y) * alpha * 0.01

        // Repulsion between nodes
        simNodes.forEach((other, j) => {
          if (i === j) return
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            const force = (100 - distance) / distance * alpha
            node.vx += dx * force
            node.vy += dy * force
          }
        })

        // Attraction along edges
        edges.forEach(edge => {
          if (edge.source === node.id || edge.target === node.id) {
            const other = simNodes.find(n => 
              n.id === (edge.source === node.id ? edge.target : edge.source)
            )
            if (other) {
              const dx = other.x - node.x
              const dy = other.y - node.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              if (distance > 150) {
                const force = (distance - 150) / distance * alpha * 0.5
                node.vx += dx * force
                node.vy += dy * force
              }
            }
          }
        })

        // Apply velocity
        node.x += node.vx
        node.y += node.vy

        // Damping
        node.vx *= 0.9
        node.vy *= 0.9

        // Boundaries
        node.x = Math.max(50, Math.min(750, node.x))
        node.y = Math.max(50, Math.min(550, node.y))
      })
    }
  }
}

function getNodeRadius(node: WikiNode): number {
  return 10 + Math.min(node.connections * 2, 30)
}

function getNodeColor(type: WikiNode['type']): string {
  switch (type) {
    case 'guide': return '#4a9eff'
    case 'note': return '#ff9f4a'
    case 'concept': return '#9f4aff'
    default: return '#666666'
  }
}

function getEdgeColor(type: WikiEdge['type']): string {
  switch (type) {
    case 'reference': return '#4a9eff'
    case 'related': return '#4aff9f'
    case 'prerequisite': return '#ffff4a'
    case 'extends': return '#9f4aff'
    case 'contradicts': return '#ff4a4a'
    case 'example': return '#ff9f4a'
    default: return '#666666'
  }
}
