interface FeedsProps {
    feed: {
      user: {
        avatar: string;
        name: string;
        id:string
      };
      feed: {
        text: string;
        image: string | null;
        liked: boolean;
        likeCount: number;
        commentsCount: number;
        comments: Array<{
          user: {
            avatar: string;
            name: string;
          };
          feed: {
            text: string;
            liked: boolean;
            likesCount: number;
          };
        }>;
      };
    };
  }

  interface Data {
    avatar: string
    username: string
    name: string
  }


