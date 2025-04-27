"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTemplateById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import config from "@/common/config"

export default function SMSPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [template, setTemplate] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  useEffect(() => {
    const templateData = getTemplateById(id)
    if (templateData && templateData.type === "sms") {
      setTemplate(templateData)
      setMessage(templateData.content)
    } else {
      router.push("/")
    }
  }, [id, router])

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/
    return phoneRegex.test(number)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)

    if (value && !validatePhoneNumber(value)) {
      setPhoneError("Please enter a valid phone number with country code (e.g., +1234567890)")
    } else {
      setPhoneError("")
    }
  }

  const handleSendSMS = async () => {
    if (!phoneNumber) {
      setPhoneError("Phone number is required")
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid phone number with country code (e.g., +1234567890)")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${config.baseUrl}/notification/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_: phoneNumber,
          message: message
        }),
      });

      if (response.ok) {
        toast({
          title: "SMS Sent",
          description: `SMS sent to ${phoneNumber}`,
        })
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to send SMS",
          description: errorData.message || "An error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send SMS",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Templates
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{template.title}</h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (with country code)</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={phoneError ? "border-destructive" : ""}
              />
              {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
              <p className="text-sm text-muted-foreground">{message.length} characters</p>
            </div>

            <Button onClick={handleSendSMS} disabled={isLoading || !phoneNumber || !!phoneError} className="w-full">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send SMS
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <div className="flex justify-center">
            <div className="w-[300px] h-[600px] bg-background border-4 border-gray-300 rounded-[36px] p-4 shadow-lg relative">
              <div className="absolute top-0 left-0 right-0 h-[60px] bg-gray-200 dark:bg-gray-700 rounded-t-[32px] flex items-center justify-center">
                <div className="w-[150px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div className="mt-[70px] h-[430px] px-2 py-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none inline-block max-w-[80%] ml-auto mb-4">
                  <div className="break-words whitespace-pre-wrap">{message}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gray-200 dark:bg-gray-700 rounded-b-[32px] flex items-center justify-center">
                <div className="w-[120px] h-[5px] bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
