import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Mathangy K",
    designation: "@mkswagger",
    image: "https://avatars.githubusercontent.com/u/34826479?v=4",
  },
  {
    id: 2,
    name: "Divyanshu yadav",
    designation: "@divyanshu1810",
    image:
      "https://media.licdn.com/dms/image/C4D03AQHcZ-NpTjvO5w/profile-displayphoto-shrink_400_400/0/1656002128364?e=1715212800&v=beta&t=GlM0OYqExabFBVeusu4RjmZcA-G_vIl4sEg2kNC_hxA",
  },
  {
    id: 3,
    name: "Aryan Raj",
    designation: "@aryanraj2713",
    image: "https://avatars.githubusercontent.com/u/75358720?v=4",
  },
  {
    id: 4,
    name: "Kevin Jacob Paul",
    designation: "@kevinpauljacob",
    image: "https://avatars.githubusercontent.com/u/88616188?v=4",
  },
  {
    id: 5,
    name: "Mohamed Sami",
    designation: "@sm-sami",
    image: "https://avatars.githubusercontent.com/u/64266012?v=4",
  },
  {
    id: 6,
    name: "Puranjay Bhargava",
    designation: "@puranjayb",
    image: "https://avatars.githubusercontent.com/u/90250628?v=4",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
