import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import './App.css';

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    const reponse = await fetch(url)
    const newJobs = await reponse.json()
    setJobs(newJobs)
    setLoading(false)
  }
  useEffect(() => {
    fetchJobs()
  }, [])
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  const { company, dates, duties, title } = jobs[value]
  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="title-underline"></div>
      </div>
      <div className="jobs-center">
        <div className="tab">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`tab-function ${index === value && 'active-tab'}`}
              >
                {item.company}
              </button>
            )
          })}
        </div>
        <article className="tab-content">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="tab-desc">
                <FaAngleDoubleRight className="tab-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <button type="button" className="moreInfo">
        more info
      </button>
    </section>
  )
}

export default App