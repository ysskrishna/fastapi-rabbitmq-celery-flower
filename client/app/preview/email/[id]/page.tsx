"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTemplateById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Send, Smartphone, Tablet, Monitor } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function EmailPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [template, setTemplate] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    const templateData = getTemplateById(id)
    if (templateData && templateData.type === "email") {
      setTemplate(templateData)
      setSubject(templateData.subject || "")
      setContent(templateData.content)
    } else {
      router.push("/")
    }
  }, [id, router])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleSendEmail = () => {
    if (!email) {
      setEmailError("Email address is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Email Sent",
        description: `Email sent to ${email}`,
      })
    }, 1500)
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Templates
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{template.title}</h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? "border-destructive" : ""}
              />
              {emailError && <p className="text-sm text-destructive">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">HTML Content</Label>
              <Textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handleSendEmail} disabled={isLoading || !email || !!emailError} className="w-full">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send Email
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Preview</h2>

          <Tabs defaultValue="desktop">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mobile">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </TabsTrigger>
              <TabsTrigger value="tablet">
                <Tablet className="mr-2 h-4 w-4" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="desktop">
                <Monitor className="mr-2 h-4 w-4" />
                Desktop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="mt-4">
              <div className="mx-auto w-[320px] h-[480px] border rounded-lg overflow-hidden shadow-lg">
                <div className="h-[40px] bg-gray-200 dark:bg-gray-700 flex items-center px-4">
                  <div className="w-[70%] h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="h-[440px] overflow-auto bg-white">
                  <iframe
                    srcDoc={content}
                    title="Email Preview - Mobile"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tablet" className="mt-4">
              <div className="mx-auto w-full max-w-[600px] h-[480px] border rounded-lg overflow-hidden shadow-lg">
                <div className="h-[40px] bg-gray-200 dark:bg-gray-700 flex items-center px-4">
                  <div className="w-[50%] h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="h-[440px] overflow-auto bg-white">
                  <iframe
                    srcDoc={content}
                    title="Email Preview - Tablet"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="desktop" className="mt-4">
              <div className="mx-auto w-full h-[480px] border rounded-lg overflow-hidden shadow-lg">
                <div className="h-[40px] bg-gray-200 dark:bg-gray-700 flex items-center px-4">
                  <div className="w-[30%] h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="h-[440px] overflow-auto bg-white">
                  <iframe
                    srcDoc={content}
                    title="Email Preview - Desktop"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
