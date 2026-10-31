import Form from './search/Form';
import AuthButtons from './components/auth/AuthButtons';

export default function Home() {
  return (
    <div className="bg-[#020617] bg-pattern flex flex-col items-center p-4 min-h-screen relative"> 
      
      <div className="absolute top-6 right-6">
        <AuthButtons />
      </div>

      <div className="text-center max-w-4xl mx-auto mb-12 mt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Enterprise Intelligence for <br/>
          <span className="text-blue-500">GitHub Workspaces</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Empower your engineering teams with deep analytics, performance tracking, and beautiful visual charts for both repositories and developer profiles.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <Form />
      </div>
    </div>
  );
}