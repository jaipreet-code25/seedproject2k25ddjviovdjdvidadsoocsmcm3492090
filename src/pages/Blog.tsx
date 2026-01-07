import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Lock, Edit, Trash2, Calendar } from "lucide-react";
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
}

// Admin password is hardcoded as per requirements for simplicity
// In a production environment, this should use proper server-side authentication
const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY = "happyDrainBlogPosts";

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Sort by date descending (newest first)
        const sortedPosts = parsedPosts.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    }
  }, []);

  // Save posts to localStorage
  const savePosts = (updatedPosts: BlogPost[]) => {
    // Sort by date descending before saving
    const sortedPosts = [...updatedPosts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedPosts));
    setPosts(sortedPosts);
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

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingPost) {
      // Update existing post - preserve original date
      const updatedPosts = posts.map(post =>
        post.id === editingPost.id
          ? { ...post, title: formData.title, content: formData.content }
          : post
      );
      savePosts(updatedPosts);
      toast({
        title: "Post Updated!",
        description: "Your blog post has been successfully updated.",
      });
    } else {
      // Create new post with unique ID
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        title: formData.title,
        content: formData.content,
        date: new Date().toISOString(),
      };
      savePosts([...posts, newPost]);
      toast({
        title: "Post Published!",
        description: "Your blog post has been successfully published.",
      });
    }

    setFormData({ title: "", content: "" });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
  };

  const handleDelete = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
    toast({
      title: "Post Deleted",
      description: "The blog post has been removed.",
    });
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    setIsAuthenticated(false);
    setPassword("");
    setFormData({ title: "", content: "" });
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
                    <h2 className="text-3xl font-bold">{post.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-foreground/80 whitespace-pre-wrap">{post.content}</p>
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
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content..."
                    rows={10}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingPost ? "Update Post" : "Publish Post"}
                  </Button>
                  {editingPost && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingPost(null);
                        setFormData({ title: "", content: "" });
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
