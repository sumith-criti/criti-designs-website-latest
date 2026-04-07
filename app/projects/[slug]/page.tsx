import Link from 'next/link'
import { projectData } from './data'
import ProjectClient from './ProjectClient'

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }))
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