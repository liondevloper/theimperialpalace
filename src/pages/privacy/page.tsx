import PageLayout from "../../components/page-layout.tsx";
import { PageHero } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";
import { CONTACT_INFORMATION as C } from "../../lib/hotel-data.ts";

type Section = { title: string; body: string[] };

const COMPANY = "Imperial Palace (Unit of City Organisers Pvt Ltd)";

const SECTIONS: Section[] = [
  { title: "Consent", body: ["By using our website, you hereby consent to our Privacy Policy and agree to its terms."] },
  {
    title: "Information we collect",
    body: [
      "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
      "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
      "When you register for an enquiry or booking request, we may ask for your contact information, including items such as name, email address and telephone number.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "We use the information we collect in various ways, including to: provide, operate and maintain our website; improve, personalize and expand our website; understand and analyze how you use our website; develop new services and features; communicate with you to respond to your enquiries, confirm availability and rates, and send you updates; send you emails; and find and prevent fraud.",
    ],
  },
  {
    title: "Log files",
    body: [
      "We follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring and exit pages, and possibly the number of clicks. This information is not linked to anything that is personally identifiable. Its purpose is analyzing trends, administering the site and gathering demographic information.",
    ],
  },
  {
    title: "Advertising partners privacy policies",
    body: [
      "Third-party ad servers or ad networks may use technologies like cookies, JavaScript or web beacons in their advertisements and links that appear on our website. These are sent directly to users' browsers and they automatically receive your IP address. We have no access to or control over these technologies that are used by third-party advertisers.",
    ],
  },
  {
    title: "Third-party privacy policies",
    body: [
      "Our Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective privacy policies of these third-party servers for more detailed information. You can choose to disable cookies through your individual browser options.",
    ],
  },
  {
    title: "Your data protection rights",
    body: [
      "Depending on where you live, you may have the right to request access to the personal data we hold about you, ask us to correct or delete it, restrict or object to how we process it, and request a copy of it in a portable format. These rights are available to residents of California (CCPA) and of the European Union (GDPR), and we will respond to a valid request within one month. To make a request, please contact us.",
    ],
  },
  {
    title: "Children's information",
    body: [
      "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. We do not knowingly collect any personal information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout title="Privacy Policy | The Imperial Palace Rajkot" description="How The Imperial Palace, Rajkot collects, uses and protects your personal information.">
      <PageHero eyebrow="Legal" title="Privacy policy" image={HOTEL_IMAGES.exterior} />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            At {COMPANY}, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {COMPANY} and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.title} className="mt-10">
              <h2 className="font-serif text-2xl font-light text-foreground md:text-3xl">{s.title}</h2>
              <div className="mt-3 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                {s.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
              </div>
            </div>
          ))}
          <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>Questions about this policy? Write to <a href={`mailto:${C.email}`} className="text-primary underline">{C.email}</a> or call <a href={C.phoneHref} className="text-primary underline">{C.phone}</a>.</p>
          </div>
        </article>
      </section>
    </PageLayout>
  );
}
