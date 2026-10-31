import Avatar from "../../components/ui/Avatar"; 

export default function ProfileHeader({ githubData }) {
  return (
    <>
      <div className="flex items-center space-x-6 mb-8 border-b border-[#1e293b] pb-6">
        <Avatar 
          src={githubData.avatar_url || "https://github.com/identicons/jasonlong.png"} 
          alt="Avatar" 
          className="w-20 h-20" 
        />
        <div>
          <h2 className="text-2xl font-bold">
            {githubData.name || githubData.full_name || "Unknown"}
          </h2>
          <a 
            href={githubData.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline"
          >
            @{githubData.login || githubData.name}
          </a>
        </div>
      </div>

      <p className="text-slate-300 mb-8 text-lg">
        {githubData.bio || githubData.description || "No description provided by the user"}
      </p>
    </>
  );
}