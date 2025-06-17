"use client";

import { cn } from "../../lib/utils";
import { AnimatedList } from "../../@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "A [Affordable price and Quality]",
  },
  {
    name: "S [Support]",
  },
  {
    name: "S [Services]",
  },
  {
    name: "U [User friendliness]",
  },
  {
    name: "R [Reliability]",
  },
  {
    name: "A [Attention]",
  },
  {
    name: "N [Necessity]",
  },
  {
    name: "C [Creative and Innovative]",
  },
  {
    name: "E [Excellence with experts]",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto  w-full cursor-pointer overflow-hidden rounded-2xl p-3",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        
        // dark styles
        "transform-gpu dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className=" size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <i className="fa-solid fa-square-check" style={{color:'#0071fe'}}></i>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className=" flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>

            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function MissionListsec({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg  bg-background p-6 md:shadow-xl",
        className,
      )}
    >
       <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification description={""} icon={""} color={""} time={""} {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
