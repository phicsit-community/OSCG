import Achievements from "@/components/dashboard/achievments";
import ReadyToContribute from "@/components/dashboard/contribute";
import ContributionActivity from "@/components/dashboard/contribution";
import ImpactOverview from "@/components/dashboard/impact";
import PRDistribution from "@/components/dashboard/prDistribution";
import ProfileCard from "@/components/dashboard/profileCard";
import RankProgress from "@/components/dashboard/rankProgress";
import Streak from "@/components/dashboard/streak";
import TechStack from "@/components/dashboard/techStack";

const DashboardPage = () => {
  const username = "";

  return (
    <div className="space-y-6 mt-8">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm">Track your open source journey</p>
      </div>

      {/* Row 1: Profile + Rank + Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard username={username} />
        <RankProgress />
        <Streak />
      </div>

      {/* Row 2: Tech Stack + PR Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechStack />
        <PRDistribution />
      </div>

      {/* Row 3: Contribution Activity (full width) */}
      <ContributionActivity username={username} />

      {/* Row 4: Achievements (full width) */}
      <Achievements />

      {/* Row 5: Impact + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImpactOverview />
        <ReadyToContribute />
      </div>
    </div>
  );
};

export default DashboardPage;
