import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import type { Template } from "@/lib/data"

interface TemplateCardProps {
  template: Template
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const previewPath = template.type === "sms" ? `/preview/sms/${template.id}` : `/preview/email/${template.id}`
  const formattedType = template.type === "sms" ? "SMS" : "Email"

  return (
    <Card className="h-full flex flex-col border rounded-lg p-6">
      <div className="flex justify-between items-start mb-3">
        <CardTitle className="text-xl font-semibold">{template.title}</CardTitle>
        <Badge variant="outline" className={`px-3 py-1 rounded-md ${template.type === "sms" ? "bg-muted" : ""}`}>
          {formattedType}
        </Badge>
      </div>
      
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          {template.type === "email" ? template.subject : template.content.replace(/{{.*?}}/g, "...")}
        </p>
      </div>
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link href={previewPath} className="w-full">
          <Button className="w-full" variant="default">
            <Eye className="mr-2 h-4 w-4" />
            Preview {formattedType}
          </Button>
        </Link>
      </div>
    </Card>
  )
}
