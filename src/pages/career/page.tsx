import { Briefcase, Clock, Heart, Mail, TrendingUp, Users } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryForm from "../../components/enquiry-form.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";
import { CAREER_EMAIL } from "../../lib/emails.ts";

const PERKS = [
  { icon: Users, title: "Teamwork", text: "A dynamic work environment that promotes teamwork." },
  { icon: TrendingUp, title: "Professional growth", text: "Learn new technologies and work with accomplished professionals." },
  { icon: Heart, title: "Rewarding benefits", text: "Benefit and compensation programs designed to reward people who make a difference." },
  { icon: Clock, title: "Immediate impact", text: "Make an impact from day one at one of Gujarat's best known hotels." },
];

const ABOUT = [
  "The Imperial Palace is one of the biggest and most luxurious hotels in the western Indian state of Gujarat and has created for itself an image for impeccable service. We are interested in employees with very strong work ethics and a commitment to maintain the standards of service the Imperial Palace Rajkot is known for.",
  "Imperial Palace offers a dynamic work environment that promotes teamwork and encourages professional growth. Our benefit and compensation programs have been designed to reward employees who make a difference. At the Imperial Palace Rajkot you have the opportunity to make an immediate impact, learn new technologies and work with other extremely accomplished professionals. Our employees take pride in their work, the hotel and themselves.",
  "If you possess a positive attitude with a strong belief in high quality service and would like to learn more about career opportunities with the Imperial Palace, please send us your details to find an opening for you at Imperial Palace.",
];

export default function CareerPage() {
  return (
    <PageLayout title="Careers | The Imperial Palace Rajkot" description="Build your career at The Imperial Palace, a 5-star hotel in Rajkot. Send us your details and we will find an opening for you.">
      <PageHero eyebrow="Careers" title="Build your career with us" image={HOTEL_IMAGES.lobby} />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal><SectionHeading eyebrow="Join The Imperial Palace" title="A place where service is a craft" /></Reveal>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
              {ABOUT.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {PERKS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="border border-border bg-card p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-serif text-lg text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
            <a href={`mailto:${CAREER_EMAIL}`} className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4 text-primary" />Careers: {CAREER_EMAIL}
            </a>
          </div>
          <div id="apply" className="scroll-mt-28 self-start border border-border bg-card p-5 md:p-8">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary"><Briefcase className="h-4 w-4" />Apply now</p>
            <div className="mt-4"><EnquiryForm kind="career" /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
