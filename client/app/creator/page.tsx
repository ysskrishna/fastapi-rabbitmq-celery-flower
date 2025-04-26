import {
    CameraIcon,
    EnvelopeClosedIcon,
    ExternalLinkIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
  } from "@radix-ui/react-icons"
  import { Metadata } from "next"
  import Link from "next/link"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import config from "@/common/config"
  
  export const metadata: Metadata = {
    title: `${config.creator.fullName} - Full Stack Developer`,
    description: config.creator.bio,
    openGraph: {
      title: `${config.creator.fullName} - Full Stack Developer`,
      description: config.creator.bio,
      images: [config.creator.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.creator.fullName} - Full Stack Developer`,
      description: config.creator.bio,
      images: [config.creator.image],
    },
  }
  
  export default function CreatorPage() {
    return (
      <>
        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-br from-primary/10 via-background to-background z-0">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {config.creator.fullName} <span className="block mt-2 text-2xl text-muted-foreground">@{config.creator.username}</span>
            </h1>
            </div>
          </div>
        </div>
  
        <div className="py-10">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Profile Card */}
            <Card className="h-fit">
              <CardHeader className="text-center">
                <div className="mx-auto relative w-40 h-40 mb-4 overflow-hidden rounded-full ring-4 ring-primary/10">
                  <img
                    src={config.creator.image}
                    alt={config.creator.fullName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardTitle className="text-2xl font-bold">{config.creator.fullName}</CardTitle>
                <CardDescription className="text-md mb-1">
                  <span className="text-xl text-muted-foreground">@{config.creator.username}</span>
                </CardDescription>
                <CardDescription className="text-md">
                  {config.creator.title}
                </CardDescription>
                <div className="mt-2 flex items-center justify-center space-x-1">
                  <img
                    src={`https://flagicons.lipis.dev/flags/4x3/${config.creator.countryCode}.svg`}
                    width="15"
                    alt="India"
                    className="mx-1"
                  />
                  <span>{config.creator.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Link href={config.creator.github} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline" aria-label="GitHub">
                        <GitHubLogoIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={config.creator.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline" aria-label="LinkedIn">
                        <LinkedInLogoIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={`mailto:${config.creator.email}`}>
                      <Button size="icon" variant="outline" aria-label="Email">
                        <EnvelopeClosedIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={config.creator.website} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline" aria-label="Website">
                        <ExternalLinkIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={config.creator.youtube} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline" aria-label="YouTube">
                        <CameraIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-sm mb-2 text-muted-foreground">CONTACT</h3>
                    <div className="grid gap-2">
                      <Link href={`mailto:${config.creator.email}`} className="text-sm hover:underline flex items-center gap-2">
                        <EnvelopeClosedIcon className="h-4 w-4" />
                        {config.creator.email}
                      </Link>
                      <Link href={config.creator.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline flex items-center gap-2">
                        <ExternalLinkIcon className="h-4 w-4" />
                        Personal Website
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            {/* Content Area */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7">
                    {config.creator.bio}
                  </p>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>🔧 Tech Stack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {config.creator.techStack.languages.map((tech) => (
                        <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                          <img 
                            src={`https://cdn.simpleicons.org/${tech.logo}/000`} 
                            alt={tech.name}
                            className="h-3.5 w-3.5 dark:invert" 
                          />
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {config.creator.techStack.technologies.map((tech) => (
                        <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                          <img 
                            src={`https://cdn.simpleicons.org/${tech.logo}/000`} 
                            alt={tech.name} 
                            className="h-3.5 w-3.5 dark:invert" 
                          />
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Databases</h3>
                    <div className="flex flex-wrap gap-2">
                      {config.creator.techStack.databases.map((tech) => (
                        <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                          <img 
                            src={`https://cdn.simpleicons.org/${tech.logo}/000`} 
                            alt={tech.name} 
                            className="h-3.5 w-3.5 dark:invert" 
                          />
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Cloud & DevOps</h3>
                    <div className="flex flex-wrap gap-2">
                      {config.creator.techStack.cloudDevOps.map((tech) => (
                        <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                          <img 
                            src={`https://cdn.simpleicons.org/${tech.logo}/000`} 
                            alt={tech.name} 
                            className="h-3.5 w-3.5 dark:invert" 
                          />
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Find Me On</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Link href={config.creator.linkedin} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <LinkedInLogoIcon className="h-5 w-5 mr-3" />
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-sm text-muted-foreground">Connect with me professionally</p>
                    </div>
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Link>
                  
                  <Link href={config.creator.producthunt} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="h-5 w-5 mr-3 flex items-center justify-center">
                      <span className="text-sm font-bold">P</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Product Hunt</h3>
                      <p className="text-sm text-muted-foreground">Check out my product launches</p>
                    </div>
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Link>
                  
                  <Link href={config.creator.youtube} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <CameraIcon className="h-5 w-5 mr-3" />
                    <div>
                      <h3 className="font-medium">YouTube</h3>
                      <p className="text-sm text-muted-foreground">Watch my technical content</p>
                    </div>
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    )
  } 