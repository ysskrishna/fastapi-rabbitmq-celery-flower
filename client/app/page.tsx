"use client"

import { useState, useMemo } from "react"
import { getAllTemplates, getUniqueTemplateTypes, getUniqueLanguages, getUniqueTags } from "@/lib/data"
import SearchBar from "@/components/search-bar"
import FilterSection from "@/components/filter-section"
import TemplateCard from "@/components/template-card"
import Pagination from "@/components/pagination"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedTemplateType, setSelectedTemplateType] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const templates = getAllTemplates()
  const templateTypes = getUniqueTemplateTypes()
  const languages = getUniqueLanguages()
  const tags = getUniqueTags()

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return templates.filter((template) => {
      // Type filter
      if (selectedType && template.type !== selectedType) {
        return false
      }

      // Template type filter
      if (selectedTemplateType && template.template_type !== selectedTemplateType) {
        return false
      }

      // Language filter
      if (selectedLanguage && template.language !== selectedLanguage) {
        return false
      }

      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some((tag) => template.tags.includes(tag))) {
        return false
      }

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
  }, [templates, searchQuery, selectedType, selectedTemplateType, selectedLanguage, selectedTags])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage))
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedType, selectedTemplateType, selectedLanguage, selectedTags])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <FilterSection
          templateTypes={templateTypes}
          languages={languages}
          tags={tags}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedTemplateType={selectedTemplateType}
          setSelectedTemplateType={setSelectedTemplateType}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : paginatedTemplates.length > 0 ? (
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

        {filteredTemplates.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>
    </div>
  )
}
