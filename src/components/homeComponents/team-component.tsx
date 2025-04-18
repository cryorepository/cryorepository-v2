import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TeamMember {
  name: string;
  position: string;
  image: string;
  tag: string;
  twitter?: string;  // Optional twitter link
  linkedin?: string; // Optional linkedin link
}

const teamMembers: TeamMember[] = [
  {
    "name": "Barry Bentley",
    "position": "An accomplished researcher with a focus on biopreservation, robotics, & neuromodulation.",
    "image": "https://cdn.discordapp.com/avatars/778930522625277989/61bf6ba01b7a328f42b6cf1e269bb100.webp?size=240",
    "tag": "Lead",
    "twitter": "https://x.com/kaimicahmills",
    "linkedin": "https://www.linkedin.com/in/kaimicahmills"
  },
  {
    "name": "Eli Mohamad",
    "position": "A seasoned entrepreneur with experience in AI, fintech, & biotech, with a decade in management consulting.",
    "image": "https://cdn.discordapp.com/avatars/470882691051552768/29665035467a835be723919cb86582db.webp?size=240",
    "tag": "Coordinator",
    "twitter": "https://x.com/elimohamad",
    "linkedin": "https://www.linkedin.com/in/emohamad"
  },
  {
    "name": "Kai Micah Mills",
    "position": "Built several foundations & communities with focus on supporting high-impact cryopreservation research.",
    "image": "https://cdn.prod.website-files.com/66ed6da635b0d9090efc07ed/677a807b115e12eff6df16ce_WhatsApp%20Image%202025-01-05%20at%2013.50.30%20(2).jpeg",
    "tag": "Catalyst",
    "twitter": "https://x.com/bbentley_1",
    "linkedin": "https://www.linkedin.com/in/barrybentley/"
  },
];


export default function TeamComponent() {
  return (
    <div className="teamMembers flex items-center gap-4 justify-center items-stretch flex-wrap m-auto w-full">
        {teamMembers.map((member) => (
          <Card className="w-[clamp(320px,350px,400px)] h-fill" /*max-w-[380px] w-[380px] h-[250px]*/ key={member.name}>
            <CardHeader>
              <Avatar className="h-[100px] w-[100px] m-auto overflow-hidden">
                <AvatarImage src={member.image} alt={member.name} className="h-full w-full object-cover" />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{member.name}</CardTitle>
              <p className="mx-auto font-semibold px-2 py-[1px] border border-[#6638b0] rounded-[16px] w-fit bg-gradient-to-b from-[#6638b0] to-[#9848a3] bg-clip-text text-transparent">
                {member.tag}
              </p>
              <CardDescription className="text-center px-[12px]">{member.position}</CardDescription>
              <div className="teamSocials flex items-center gap-4 m-auto w-fit">
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <img className="ATLogo" src="https://cdn.prod.website-files.com/643d6a447c6e1b4184d3ddfd/66d5fac3e349cf24282d4c49_x.svg" loading="lazy" alt="Twitter Logo" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <img className="ATLogo" src="https://cdn.prod.website-files.com/643d6a447c6e1b4184d3ddfd/66d5fac37f8cbd3e1a53d406_linkedin.svg" loading="lazy" alt="LinkedIn Logo" />
                  </a>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}