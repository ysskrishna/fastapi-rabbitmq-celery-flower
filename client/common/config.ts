const config = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000',
    productName: "TemplateHub",
    creator: {
      fullName: "Y. Siva Sai Krishna",
      username: "ysskrishna",
      image: "https://github.com/ysskrishna.png",
      bio: "Experienced Full Stack Developer and Founding Engineer with a strong technical background from IIT Madras. I architect scalable web and mobile applications using modern technologies and best practices. My expertise spans backend systems, frontend development, and cloud infrastructure, with a focus on delivering high-performance solutions for complex business challenges.",
      email: "sivasaikrishnassk@gmail.com",
      website: "https://bento.me/ysskrishna",
      github: "https://github.com/ysskrishna",
      linkedin: "https://linkedin.com/in/ysskrishna",
      producthunt: "https://www.producthunt.com/@ysskrishna",
      youtube: "https://www.youtube.com/@ysskrishna",
      location: "Bengaluru, India",
      countryCode: "in",
      title: "Full Stack Developer | Founding Engineer | IITM Graduate",
      techStack: {
        languages: [
          { name: "Python", logo: "python" },
          { name: "JavaScript", logo: "javascript" },
          { name: "SQL", logo: "postgresql" },
          { name: "TypeScript", logo: "typescript" },
          { name: "HTML", logo: "html5" },
          { name: "CSS", logo: "css3" },
          { name: "Bash", logo: "gnubash" },
        ],
        technologies: [
          { name: "FastAPI", logo: "fastapi" },
          { name: "Express", logo: "express" },
          { name: "Flask", logo: "flask" },
          { name: "React", logo: "react" },
          { name: "Next.js", logo: "nextdotjs" },
          { name: "React Native", logo: "react" },
          { name: "GraphQL", logo: "graphql" },
          { name: "Tailwind CSS", logo: "tailwindcss" },
          { name: "Node.js", logo: "nodedotjs" },
          { name: "Bootstrap", logo: "bootstrap" },
          { name: "Notion", logo: "notion" },
          { name: "RabbitMQ", logo: "rabbitmq" },
        ],
        databases: [
          { name: "PostgreSQL", logo: "postgresql" },
          { name: "SQLite", logo: "sqlite" },
          { name: "MongoDB", logo: "mongodb" },
          { name: "Redis", logo: "redis" },
          { name: "Elasticsearch", logo: "elasticsearch" },
          { name: "Firebase", logo: "firebase" },
        ],
        cloudDevOps: [
          { name: "AWS", logo: "amazonwebservices" },
          { name: "Docker", logo: "docker" },
          { name: "GitHub Actions", logo: "githubactions" },
          { name: "Vercel", logo: "vercel" },
          { name: "Netlify", logo: "netlify" },
          { name: "Heroku", logo: "heroku" },
          { name: "Git", logo: "git" },
          { name: "GitHub", logo: "github" },
        ],
      }
    }
  };
  
  export default config;