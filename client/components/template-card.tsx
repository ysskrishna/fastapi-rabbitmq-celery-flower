import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import type { Template } from "@/lib/data"

interface TemplateCardProps {
  template: Template
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const previewPath = template.type === "sms" ? `/preview/sms/${template.id}` : `/preview/email/${template.id}`

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{template.title}</CardTitle>
          <Badge variant={template.type === "sms" ? "default" : "secondary"}>{template.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <Badge variant="outline" className="mr-1 mb-1">
            {template.template_type}
          </Badge>
          <Badge variant="outline" className="mr-1 mb-1">
            {template.language}
          </Badge>
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="mr-1 mb-1">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge variant="outline" className="mb-1">
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {template.type === "email" ? template.subject : template.content.replace(/{{.*?}}/g, "...")}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={previewPath} className="w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview {template.type === "sms" ? "SMS" : "Email"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
