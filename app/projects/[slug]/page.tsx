import Link from 'next/link'
import { Metadata } from 'next'
import { projectData } from './data'
import ProjectClient from './ProjectClient'

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectData[slug]

  if (!project) {
    return {
      title: 'Project Not Found | Criti Developers',
    }
  }

  const seoTitle = `${project.title} - ${project.type} Project in ${project.location} | Criti Developers`
  const seoDesc = project.description || `Explore ${project.title}, a premium ${project.type.toLowerCase()} architectural design and construction project in ${project.location} by Criti Developers.`

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: `${project.title.toLowerCase()}, projects in ${project.location.toLowerCase()}, ${project.type.toLowerCase()} builders, criti developers projects, construction payyannur`,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [
        {
          url: project.heroImage,
          alt: project.title,
        },
      ],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const project = projectData[slug]

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-muted-gold hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return <ProjectClient project={project} />
}