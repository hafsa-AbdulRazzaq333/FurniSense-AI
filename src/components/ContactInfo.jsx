import { motion } from "framer-motion";
import { Mail, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const items = [
  {
    icon: Mail,
    title: "Email",
    value: "hafsaabdulrazaq333@gmail.com",
    link: "mailto:hafsaabdulrazaq333@gmail.com",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "Let's Connect",
    link: "https://www.linkedin.com/in/hafsa-abdul-razaq-492b26322/",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "Explore My Projects",
    link: "https://github.com/hafsa-AbdulRazzaq333",
  },
];

const services = [
  "Frontend Development",
  "Full Stack Development",
  "AI Projects",
  "Collaboration",
];

export default function ContactInfo() {
  return (
    <section className="bg-[#FCFAF7] pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[36px] border border-[#E8DED3] bg-white shadow-[0_20px_60px_rgba(0,0,0,.05)]"
        >
          {/* Top */}

          <div className="border-b border-[#EFE7DD] px-10 py-10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F5F0] text-[#8B5E3C]">
                <Sparkles size={24} />
              </div>

              <div>
                <h2 className="mt-2 text-3xl font-bold text-[#2D2D2D]">
                  Hafsa Abdul Razaq
                </h2>

                <p className="mt-2 text-[#666]">
                  Frontend Developer • Full Stack Leaner • AI Enthusiast
                </p>
              </div>
            </div>
          </div>

          {/* Contact Items */}

          <div>
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  href={item.link}
                  target={item.title !== "Email" ? "_blank" : ""}
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  className={`group flex items-center justify-between px-10 py-7 transition hover:bg-[#FCFAF7]
                  ${index !== items.length - 1 && "border-b border-[#EFE7DD]"}`}
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F8F5F0] text-[#8B5E3C]">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[.25em] text-[#999]">
                        {item.title}
                      </p>

                      <h3 className="mt-2 wrap-break-word text-lg font-semibold leading-7 text-[#2D2D2D]">
                        {item.value}
                      </h3>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={22}
                    className="text-[#8B5E3C] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Bottom */}

          <div className="border-t border-[#EFE7DD] bg-[#FCFAF7] px-10 py-8">
            <p className="mb-5 text-xs uppercase tracking-[.25em] text-[#8B5E3C]">
              Available For
            </p>

            <div className="flex flex-wrap gap-4">
              {services.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-[#E8DED3] bg-white px-5 py-3"
                >
                  <CheckCircle2 size={18} className="text-[#8B5E3C]" />

                  <span className="text-[#555]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
