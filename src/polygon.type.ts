// src/types.ts

export interface Polygon {
    lat: number;
    lng: number;
  }
  
  export interface SubCategory {
    id: string;
    English: {
      title: string;
      text: string;
    };
  }
  
  export interface ProfileBasedAlert {
    categoryId: string;
    subCategoryId: SubCategory[];
  }
  
  export interface Body {
    generic: {
      English: {
        title: string;
        text: string;
      };
    };
    profileBasedAlert: ProfileBasedAlert[];
  }
  
  export interface AboutData {
    polygon: Polygon[];
    likes: number;
    dislikes: number;
    _id: string;
    body: Body;
  }
  