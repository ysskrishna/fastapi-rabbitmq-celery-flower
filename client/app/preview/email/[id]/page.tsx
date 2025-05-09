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
import { ArrowLeft, Send, Smartphone, Tablet, Monitor, Code } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import config from "@/common/config"

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

  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("Email address is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${config.baseUrl}/notification/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_: email,
          subject: subject,
          message: content
        }),
      });

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: `Email sent to ${email}`,
        })
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to send email",
          description: errorData.message || "An error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const prettifyHTML = () => {
    try {
      // First normalize the HTML by removing existing whitespace between tags
      const normalizedHTML = content.replace(/>\s+</g, '><');
      
      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(normalizedHTML, 'text/html');
      
      // Get formatted HTML with indentation (basic formatting)
      const formattedHTML = formatHTML(doc.documentElement.outerHTML);
      
      setContent(formattedHTML);
      toast({
        title: "HTML Prettified",
        description: "The HTML content has been formatted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not prettify HTML. Check for syntax errors.",
        variant: "destructive",
      });
    }
  };

  // Function to format HTML with proper indentation
  const formatHTML = (html: string) => {
    // First normalize HTML by removing whitespace between tags
    const normalizedHTML = html.replace(/>\s+</g, '><');
    
    let formatted = '';
    let indent = '';
    
    // Split the HTML into lines by tags
    normalizedHTML.replace(/(>)(<)(\/*)/g, '$1\n$2$3').split('\n').forEach(line => {
      if (line.match(/^<\/\w/)) { // If this is a closing tag
        indent = indent.substring(2);
      }
      
      formatted += indent + line + '\n';
      
      if (line.match(/^<\w[^>]*[^\/]>.*$/) && 
          !line.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr).*?>/i)) {
        // If this is an opening tag (not self-closing) and not a void element
        indent += '  ';
      }
    });
    
    return formatted.trim();
  };

  if (!template) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="content">HTML Content</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prettifyHTML}
                  className="flex gap-1 items-center"
                >
                  <Code className="h-4 w-4" />
                  Prettify HTML
                </Button>
              </div>
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
