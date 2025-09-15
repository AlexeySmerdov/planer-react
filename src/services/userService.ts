import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile } from '../types/user';

const USERS_COLLECTION = 'users';

export class UserService {
  static async createUserProfile(userId: string, email: string, displayName: string): Promise<void> {
    try {
      console.log('Creating user profile in Firestore:', { userId, email, displayName });
      
      const userRef = doc(db, USERS_COLLECTION, userId);
      const userProfile: Omit<UserProfile, 'id'> = {
        email,
        displayName,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(userRef, userProfile);
      console.log('User profile created successfully');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Не удалось создать профиль пользователя');
    }
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return {
          id: userSnap.id,
          ...userSnap.data()
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Не удалось загрузить профиль пользователя');
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Не удалось обновить профиль пользователя');
    }
  }
}
