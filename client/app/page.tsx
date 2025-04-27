"use client"

import { useState, useMemo, useEffect } from "react"
import { getAllTemplates } from "@/lib/data"
import SearchBar from "@/components/search-bar"
import TemplateCard from "@/components/template-card"
import Pagination from "@/components/pagination"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredTemplates, setFilteredTemplates] = useState([] as any[])
  const [activeTab, setActiveTab] = useState("all")

  const templates = getAllTemplates()

  // Filter and search templates
  useEffect(() => {
    setIsLoading(true)
    
    const timer = setTimeout(() => {
      const filtered = templates.filter((template) => {
        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            template.title.toLowerCase().includes(query) ||
            template.content.toLowerCase().includes(query) ||
            template.template_type.toLowerCase().includes(query) ||
            (template.subject && template.subject.toLowerCase().includes(query)) ||
            template.tags.some((tag) => tag.toLowerCase().includes(query))
          )
        }
        return true
      })
      
      setFilteredTemplates(filtered)
      setIsLoading(false)
      setCurrentPage(1)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [templates, searchQuery])

  // Reset current page when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

  // Filter templates by type for tabs
  const allTemplates = filteredTemplates
  const smsTemplates = filteredTemplates.filter(template => template.type === "sms")
  const emailTemplates = filteredTemplates.filter(template => template.type === "email")

  // Get current templates based on active tab
  const getCurrentTemplates = () => {
    switch (activeTab) {
      case "sms": return smsTemplates
      case "email": return emailTemplates
      default: return allTemplates
    }
  }

  const currentTemplates = getCurrentTemplates()
  
  // Pagination
  const totalPages = Math.max(1, Math.ceil(currentTemplates.length / itemsPerPage))
  const paginatedTemplates = currentTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="w-full">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : allTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No templates found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sms" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : smsTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No SMS templates found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : emailTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No email templates found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {currentTemplates.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  )
}
