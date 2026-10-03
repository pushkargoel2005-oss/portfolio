import { motion, useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, y = 24, className = '', once = true, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} {...rest}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
