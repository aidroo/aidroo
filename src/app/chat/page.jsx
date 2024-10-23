 import Layout from '@/components/Layout/Layout';
import { ChatPage } from './chat-page';
 
 export default function page() {
   return (
     <Layout>
      <div className='max-w-7xl mx-auto'>

       <ChatPage />
      </div>
     </Layout>
   );
 }
 