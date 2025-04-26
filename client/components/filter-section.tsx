"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  templateTypes: string[]
  languages: string[]
  tags: string[]
  selectedType: string | null
  setSelectedType: (type: string | null) => void
  selectedTemplateType: string | null
  setSelectedTemplateType: (templateType: string | null) => void
  selectedLanguage: string | null
  setSelectedLanguage: (language: string | null) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

export default function FilterSection({
  templateTypes,
  languages,
  tags,
  selectedType,
  setSelectedType,
  selectedTemplateType,
  setSelectedTemplateType,
  selectedLanguage,
  setSelectedLanguage,
  selectedTags,
  setSelectedTags,
}: FilterSectionProps) {
  const [tagsOpen, setTagsOpen] = useState(false)

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? null : type)
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
  }

  const clearFilters = () => {
    setSelectedType(null)
    setSelectedTemplateType(null)
    setSelectedLanguage(null)
    setSelectedTags([])
  }

  const hasActiveFilters = selectedType || selectedTemplateType || selectedLanguage || selectedTags.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === "sms" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeClick("sms")}
        >
          SMS
        </Button>
        <Button
          variant={selectedType === "email" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeClick("email")}
        >
          Email
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Template Type
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandList>
                <CommandGroup>
                  {templateTypes.map((type) => (
                    <CommandItem
                      key={type}
                      onSelect={() => setSelectedTemplateType(selectedTemplateType === type ? null : type)}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedTemplateType === type ? "opacity-100" : "opacity-0")}
                      />
                      {type}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Language
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandList>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      key={language}
                      onSelect={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedLanguage === language ? "opacity-100" : "opacity-0")}
                      />
                      {language}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Tags
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem key={tag} onSelect={() => handleTagSelect(tag)}>
                      <Check className={cn("mr-2 h-4 w-4", selectedTags.includes(tag) ? "opacity-100" : "opacity-0")} />
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {selectedType}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType(null)} />
            </Badge>
          )}
          {selectedTemplateType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Template Type: {selectedTemplateType}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedTemplateType(null)} />
            </Badge>
          )}
          {selectedLanguage && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Language: {selectedLanguage}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLanguage(null)} />
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              Tag: {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
