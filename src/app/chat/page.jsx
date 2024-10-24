 import Layout from '@/components/Layout/Layout';
import ChatPage from './chat-page';
 
 export default function page() {
   return (
     <Layout>
       <section className='w-full max-w-7xl mx-auto my-2'>
         <ChatPage />
       </section>
     </Layout>
   );
 }
 