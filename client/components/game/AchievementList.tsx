import { Achievement } from '@/types/dashboard/achievement.types';
import AchievementCard from '@/components/game/AchievementCard';
import { styles } from '@/lib/constants/styles';

interface AchievementListProps {
  achievements: Achievement[];
}

export default function AchievementList({
  achievements,
}: AchievementListProps) {
  return (
    <section>
      <h2 className={styles.SECTION_TITLE}></h2>
      {achievements.length === 0 ? (
        <p className="text-zinc-500">No achievements to display</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              name={achievement.name}
              iconUrl={achievement.iconUrl}
              description={achievement.description}
              userAchievements={achievement.userAchievements}
              globalRarity={achievement.globalRarity}
              isMissable={achievement.isMissable}
            />
          ))}
        </div>
      )}
    </section>
  );
}
