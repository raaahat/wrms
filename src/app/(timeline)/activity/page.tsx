import { currentProfile } from '@/database/current-profile';
import { MaintEngineerPanel } from '@/features/timeline/components/MaintEngineerPanel';
import { OPEngrPanel } from '@/features/timeline/components/OPEngrPanel';
import { getTimelineActivity } from '@/features/timeline/query';
import { redirect } from 'next/navigation';

const ActivityPage = async () => {
  const profile = await currentProfile();
  if (!profile || !profile.verified) return redirect('/register');
  const timeline = await getTimelineActivity(profile.id);
  if (timeline?.wrIssuedTo.length !== 0 && timeline) {
    return (
      <MaintEngineerPanel profile={profile} timelines={timeline.wrIssuedTo} />
    );
  }
  if (timeline?.operationTimeLines.length !== 0 && timeline)
    return (
      <OPEngrPanel profile={profile} timelines={timeline?.operationTimeLines} />
    );

  return <div>you have no activities.</div>;
};

export default ActivityPage;
