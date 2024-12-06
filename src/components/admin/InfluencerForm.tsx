import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { InfluencerService } from "@/lib/services/influencer-service";
import { type Influencer } from "@/types/influencer";

interface InfluencerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingInfluencer?: Influencer;
}

export function InfluencerForm({ open, onOpenChange, editingInfluencer }: InfluencerFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    coverImage: '',
    specialties: '',
    followers: '0',
    instagram_username: '',
    instagram_url: '',
    youtube_username: '',
    youtube_url: '',
    tiktok_username: '',
    tiktok_url: ''
  });

  useEffect(() => {
    if (editingInfluencer) {
      const instagram = editingInfluencer.socialMedia.find(s => s.platform === 'instagram');
      const youtube = editingInfluencer.socialMedia.find(s => s.platform === 'youtube');
      const tiktok = editingInfluencer.socialMedia.find(s => s.platform === 'tiktok');

      setFormData({
        name: editingInfluencer.name,
        bio: editingInfluencer.bio,
        avatar: editingInfluencer.avatar,
        coverImage: editingInfluencer.coverImage,
        specialties: editingInfluencer.specialties.join(', '),
        followers: editingInfluencer.followers.toString(),
        instagram_username: instagram?.username || '',
        instagram_url: instagram?.url || '',
        youtube_username: youtube?.username || '',
        youtube_url: youtube?.url || '',
        tiktok_username: tiktok?.username || '',
        tiktok_url: tiktok?.url || ''
      });
    } else {
      setFormData({
        name: '',
        bio: '',
        avatar: '',
        coverImage: '',
        specialties: '',
        followers: '0',
        instagram_username: '',
        instagram_url: '',
        youtube_username: '',
        youtube_url: '',
        tiktok_username: '',
        tiktok_url: ''
      });
    }
  }, [editingInfluencer]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const socialMedia = [
        {
          platform: 'instagram' as const,
          url: formData.instagram_url,
          username: formData.instagram_username
        },
        {
          platform: 'youtube' as const,
          url: formData.youtube_url,
          username: formData.youtube_username
        },
        {
          platform: 'tiktok' as const,
          url: formData.tiktok_url,
          username: formData.tiktok_username
        }
      ].filter(social => social.url && social.username);

      const influencerData = {
        name: formData.name,
        bio: formData.bio,
        avatar: formData.avatar,
        coverImage: formData.coverImage,
        specialties: formData.specialties.split(',').map(s => s.trim()),
        followers: parseInt(formData.followers),
        socialMedia,
        recipesCount: editingInfluencer?.recipesCount || 0
      };

      if (editingInfluencer) {
        InfluencerService.update(editingInfluencer.id, influencerData);
        toast({
          title: "Influencer updated successfully",
        });
      } else {
        InfluencerService.create(influencerData);
        toast({
          title: "Influencer created successfully",
        });
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: editingInfluencer ? "Error updating influencer" : "Error creating influencer",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingInfluencer ? 'Edit Influencer' : 'Add New Influencer'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="followers">Followers</Label>
              <Input 
                id="followers" 
                name="followers" 
                type="number"
                value={formData.followers}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input 
                id="avatar" 
                name="avatar" 
                type="url"
                value={formData.avatar}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input 
                id="coverImage" 
                name="coverImage" 
                type="url"
                value={formData.coverImage}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties (comma-separated)</Label>
            <Input 
              id="specialties" 
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram_username">Instagram Username</Label>
              <Input 
                id="instagram_username" 
                name="instagram_username"
                value={formData.instagram_username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input 
                id="instagram_url" 
                name="instagram_url"
                type="url"
                value={formData.instagram_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="youtube_username">YouTube Username</Label>
              <Input 
                id="youtube_username" 
                name="youtube_username"
                value={formData.youtube_username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input 
                id="youtube_url" 
                name="youtube_url"
                type="url"
                value={formData.youtube_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tiktok_username">TikTok Username</Label>
              <Input 
                id="tiktok_username" 
                name="tiktok_username"
                value={formData.tiktok_username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok_url">TikTok URL</Label>
              <Input 
                id="tiktok_url" 
                name="tiktok_url"
                type="url"
                value={formData.tiktok_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : (editingInfluencer ? "Save Changes" : "Create Influencer")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}