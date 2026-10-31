import SaveNote from "./SaveNote";
import ReturnLink from "./ReturnLink";
import StatCard from "./ui/StatCard"; 
import ProfileHeader from "./ui/ProfileHeader";

export default async function ReportPage({ searchParams }) {
  const params = await searchParams;
  const { type, prompt } = params;

  let githubData = null;
  let error = null;

  try {
    const endpoint = type === "profile" 
      ? `https://api.github.com/users/${prompt}`
      : `https://api.github.com/repos/${prompt}`;

    const res = await fetch(endpoint, { next: { revalidate: 60 } }); 
    if (!res.ok) throw new Error("Not found");
    githubData = await res.json();
  } catch (err) {
    error = "Could not find this GitHub account or repository.";
  }

  return (
    <div className="min-h-screen bg-[#020617] bg-pattern flex justify-center items-start p-6 pt-20">
      <div className="w-full max-w-3xl">
        
        <h1 className="text-3xl font-bold mb-2 text-white">
          Analysis <span className="text-blue-500">Report</span>
        </h1>
        
        <div className="mb-8 flex justify-between items-center bg-[#0f172a] p-3 rounded-lg border border-[#1e293b]">
         <p className="text-slate-400">
          <span className="text-white font-bold">{prompt}</span>
         </p>
         <ReturnLink />
        </div>

        {error && (
          <div className="p-6 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-400">
            {error}
          </div>
        )}

        {githubData && !error && (
          <div className="p-8 bg-[#0f172a]/90 backdrop-blur-sm border border-[#1e293b] rounded-2xl shadow-xl text-white">
            
            <ProfileHeader githubData={githubData} />

            <SaveNote type={type} targetName={prompt} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {type === "profile" ? (
                <>
                  <StatCard label="Followers" value={githubData.followers} />
                  <StatCard label="Following" value={githubData.following} />
                  <StatCard label="Public Repos" value={githubData.public_repos} />
                  <StatCard label="Company" value={githubData.company || "N/A"} />
                </>
              ) : (
                <>
                  <StatCard label="Stars" value={githubData.stargazers_count} />
                  <StatCard label="Forks" value={githubData.forks_count} />
                  <StatCard label="Issues" value={githubData.open_issues_count} />
                  <StatCard label="Language" value={githubData.language || "Mixed"} />
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}