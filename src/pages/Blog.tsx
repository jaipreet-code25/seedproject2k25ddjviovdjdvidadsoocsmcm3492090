import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Lock, Edit, Trash2, Calendar, Loader2, Bold, Italic, Underline, List, ListOrdered, Link, Image, Heading1, Heading2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

// Admin password - change this to your desired password
// Anyone with this password can post to the blog
const ADMIN_PASSWORD = "admin123";

const STORAGE_KEY = "blogPosts";

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error("Error loading posts:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Formatting functions
  const insertText = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = textarea.value.substring(0, start) + before + textToInsert + after + textarea.value.substring(end);

    setFormData({ ...formData, content: newText });

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length + (selectedText ? 0 : after.length);
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      insertText(`![Image](${dataUrl})`, "", "Image description");
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingPost) {
        // Update existing post
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === editingPost.id
              ? { ...post, title: formData.title, content: formData.content, author: formData.author }
              : post
          )
        );
        toast({
          title: "Post Updated!",
          description: "Your blog post has been successfully updated.",
        });
      } else {
        // Create new post
        const newPost: BlogPost = {
          id: Date.now().toString(), // Simple unique ID
          title: formData.title,
          content: formData.content,
          author: formData.author,
          date: new Date().toISOString(),
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        toast({
          title: "Post Published!",
          description: "Your blog post has been successfully published.",
        });
      }

      setFormData({ title: "", content: "", author: "" });
      setEditingPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content, author: post.author });
  };

  const handleDelete = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    toast({
      title: "Post Deleted",
      description: "The blog post has been removed.",
    });
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    setIsAuthenticated(false);
    setPassword("");
    setFormData({ title: "", content: "", author: "" });
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple markdown renderer
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Handle headings
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h2>;
        }

        // Handle lists
        if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
          return <li key={index} className="ml-4">{line.replace(/^[-]\s|^(\d+\.)\s/, '')}</li>;
        }

        // Handle empty lines (for spacing)
        if (line.trim() === '') {
          return <br key={index} />;
        }

        // Handle regular paragraphs with inline formatting
        let processedLine = line;

        // Bold (**text**)
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic (*text*)
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Underline (<u>text</u>)
        processedLine = processedLine.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');

        // Links [text](url)
        processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

        // Images ![alt](url)
        processedLine = processedLine.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />');

        return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
      });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Stay updated with the latest news, insights, and updates from Happy Drains Solutions
            </p>
            <Button onClick={() => setIsAdminOpen(true)} variant="outline" className="gap-2">
              <Lock className="w-4 h-4" /> Admin Panel
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-glass p-8 rounded-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-3xl font-bold">{post.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">By {post.author}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {renderContent(post.content)}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Admin Dialog */}
      <Dialog open={isAdminOpen} onOpenChange={handleCloseAdmin}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
            <DialogDescription>
              {isAuthenticated
                ? "Create or edit blog posts"
                : "Enter the admin password to continue"}
            </DialogDescription>
          </DialogHeader>

          {!isAuthenticated ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Blog Editor */}
              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Author Name
                  </label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Content
                  </label>
                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 border border-border rounded-t-lg bg-muted/30">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("**", "**", "bold text")}
                      className="h-8 w-8 p-0"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("*", "*", "italic text")}
                      className="h-8 w-8 p-0"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("<u>", "</u>", "underlined text")}
                      className="h-8 w-8 p-0"
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("# ", "", "Heading")}
                      className="h-8 w-8 p-0"
                      title="Heading 1"
                    >
                      <Heading1 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("## ", "", "Subheading")}
                      className="h-8 w-8 p-0"
                      title="Heading 2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("- ", "", "List item")}
                      className="h-8 w-8 p-0"
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("1. ", "", "List item")}
                      className="h-8 w-8 p-0"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertText("[", "](url)", "link text")}
                      className="h-8 w-8 p-0"
                      title="Link"
                    >
                      <Link className="w-4 h-4" />
                    </Button>
                    <label className="cursor-pointer">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Upload Image"
                        asChild
                      >
                        <span>
                          <Image className="w-4 h-4" />
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <Textarea
                    ref={textareaRef}
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content...&#10;&#10;Formatting tips:&#10;• Use **bold** and *italic* text&#10;• Create headings with # and ##&#10;• Make lists with - or 1.&#10;• Add links with [text](url)&#10;• Upload images with the image button"
                    rows={12}
                    required
                    className="rounded-t-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {editingPost ? "Updating..." : "Publishing..."}
                      </>
                    ) : (
                      editingPost ? "Update Post" : "Publish Post"
                    )}
                  </Button>
                  {editingPost && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingPost(null);
                        setFormData({ title: "", content: "", author: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              {/* Existing Posts Management */}
              {posts.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Manage Posts</h3>
                  <div className="space-y-2">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(post.date)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(post)}
                            className="gap-1"
                          >
                            <Edit className="w-3 h-3" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(post.id)}
                            className="gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default Blog;
