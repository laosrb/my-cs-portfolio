import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Eye, EyeOff, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function BlogSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", is_visible: true });
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => base44.entities.BlogPost.list("-created_date"),
    initialData: [],
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
    onSuccess: (user) => {
      setIsAdmin(user?.role === "admin");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.BlogPost.create({
      ...data,
      published_date: new Date().toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogPosts"]);
      setShowEditor(false);
      setFormData({ title: "", content: "", is_visible: true });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.BlogPost.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogPosts"]);
      setShowEditor(false);
      setEditingPost(null);
      setFormData({ title: "", content: "", is_visible: true });
    },
  });

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ 
      title: post.title, 
      content: post.content, 
      is_visible: post.is_visible 
    });
    setShowEditor(true);
  };

  const handleSubmit = () => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const visiblePosts = isAdmin ? posts : posts.filter(p => p.is_visible);

  return (
    <div className="space-y-6">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex justify-between items-center pb-4 border-b">
          <div className="text-sm text-gray-500">Admin Mode</div>
          <Button onClick={() => setShowEditor(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>
      )}

      {/* Blog Posts */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No blog posts yet. Check back soon!
        </div>
      ) : (
        <div className="space-y-4">
          {visiblePosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                      <Badge variant={post.is_visible ? "default" : "secondary"}>
                        {post.is_visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.published_date || post.created_date), "MMMM d, yyyy")}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "New Blog Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content..."
                rows={8}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Visible to viewers</label>
              <Switch
                checked={formData.is_visible}
                onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditor(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingPost ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

