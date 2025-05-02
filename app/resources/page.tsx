"use client";

import { useState } from "react";
import { BookOpen, ExternalLink, FileText, Pencil, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockResources } from "@/lib/data";
import { AcademicResource } from "@/lib/types";

export default function ResourcesPage() {
  const [resources] = useState<AcademicResource[]>(mockResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredResources = resources.filter(
    (resource) =>
      (searchQuery
        ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true) &&
      (categoryFilter && categoryFilter !== "all" ? resource.category === categoryFilter : true)
  );

  const categoryIcons: Record<string, JSX.Element> = {
    writing: <Pencil className="h-5 w-5" />,
    learning: <BookOpen className="h-5 w-5" />,
    template: <FileText className="h-5 w-5" />,
  };

  const getResourcesByCategory = (category: string) => {
    return filteredResources.filter((resource) => resource.category === category);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Academic Resources</h1>
        <p className="text-muted-foreground">
          Access helpful templates, guides, and learning materials for your studies.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="writing">Writing</SelectItem>
            <SelectItem value="learning">Learning</SelectItem>
            <SelectItem value="template">Templates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="template">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  icon={categoryIcons[resource.category]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No resources found with the current filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="writing">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getResourcesByCategory("writing").length > 0 ? (
              getResourcesByCategory("writing").map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  icon={categoryIcons[resource.category]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No writing resources found with the current filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getResourcesByCategory("learning").length > 0 ? (
              getResourcesByCategory("learning").map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  icon={categoryIcons[resource.category]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No learning resources found with the current filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="template">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getResourcesByCategory("template").length > 0 ? (
              getResourcesByCategory("template").map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  icon={categoryIcons[resource.category]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No templates found with the current filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ResourceCardProps {
  resource: AcademicResource;
  icon: JSX.Element;
}

function ResourceCard({ resource, icon }: ResourceCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
            <CardTitle className="text-xl">{resource.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          {resource.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Visit Resource <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}