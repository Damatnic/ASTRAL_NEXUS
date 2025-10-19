'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StudyPlan, generateStudyPlan } from '@/lib/study-plan'
import { Guide } from '@/lib/guides'
import Link from 'next/link'

interface StudyPlanViewerProps {
  guide: Guide
}

export default function StudyPlanViewer({ guide }: StudyPlanViewerProps) {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [targetDays, setTargetDays] = useState(7)
  const [dailyMinutes, setDailyMinutes] = useState(30)

  useEffect(() => {
    const plan = generateStudyPlan(guide, targetDays, dailyMinutes)
    setStudyPlan(plan)
  }, [guide, targetDays, dailyMinutes])

  if (!studyPlan) return null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Settings */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">
          Customize Your <span className="text-primary">Study Plan</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Study Duration</label>
            <select
              value={targetDays}
              onChange={(e) => setTargetDays(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value={3}>3 Days (Intensive)</option>
              <option value={7}>7 Days (Standard)</option>
              <option value={14}>14 Days (Relaxed)</option>
              <option value={30}>30 Days (Thorough)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Daily Study Time</label>
            <select
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-primary">Learning Goals</h3>
        <ul className="space-y-2">
          {studyPlan.goals.map((goal, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-primary">✦</span>
              <span className="text-gray-300">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Daily Schedule */}
      <div className="space-y-4">
        {studyPlan.days.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold">Day {day.day}</h4>
                <p className="text-sm text-gray-400">{day.date.toLocaleDateString()}</p>
              </div>
              <div className="text-primary font-semibold">{day.totalMinutes} min</div>
            </div>

            <div className="space-y-3">
              {day.tasks.map((task, taskIdx) => (
                <div
                  key={taskIdx}
                  className="flex items-center justify-between p-4 rounded-lg glass-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {task.type === 'read' && '📖'}
                      {task.type === 'flashcards' && '🎴'}
                      {task.type === 'quiz' && '✏️'}
                      {task.type === 'review' && '🔄'}
                    </div>
                    <div>
                      <div className="font-semibold">{task.title}</div>
                      {task.section && (
                        <div className="text-xs text-gray-400">{task.section}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{task.duration} min</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-8 text-center">
        <Link href={`/guides/${guide.slug}`} className="btn-primary px-8 py-4 text-lg">
          Start Study Plan →
        </Link>
      </div>
    </div>
  )
}

