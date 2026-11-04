import { steps } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Process.module.css'

export function Process() {
  return (
    <section className={styles.section} aria-labelledby="proceso-title">
      <div className="container">
        <SectionHeading
          id="proceso-title"
          eyebrow="Cómo trabajamos"
          title={
            <>
              Tu evento en <em>tres pasos</em>
            </>
          }
        />
        <ol role="list" className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className={styles.step}>
              <span className={styles.badge} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
