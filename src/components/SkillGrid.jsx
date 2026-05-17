const skills = [
  {
    name: "React",
    percent: 92,
    years: "3 Years",
    color: "#61DBFB",
  },
  {
    name: "Next.js",
    percent: 88,
    years: "2 Years",
    color: "#ffffff",
  },
  {
    name: "Laravel",
    percent: 85,
    years: "3 Years",
    color: "#ff2d20",
  },
  {
    name: "Tailwind",
    percent: 95,
    years: "3 Years",
    color: "#38bdf8",
  },
];

export default function SkillGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/[0.05]
            bg-white/[0.03]
            p-6
            backdrop-blur-sm

            shadow-[
              14px_14px_30px_rgba(0,0,0,0.55),
              -8px_-8px_20px_rgba(255,255,255,0.02),
              inset_1px_1px_0_rgba(255,255,255,0.03)
            ]

            transition-all duration-500
            hover:-translate-y-2
          "
        >
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{
              background: skill.color,
            }}
          />

          {/* Circle */}
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
            <svg className="absolute h-full w-full -rotate-90">
              {/* Background */}
              <circle
                cx="64"
                cy="64"
                r="54"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                fill="transparent"
              />

              {/* Progress */}
              <circle
                cx="64"
                cy="64"
                r="54"
                stroke={skill.color}
                strokeWidth="10"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={339.3}
                strokeDashoffset={
                  339.3 - (339.3 * skill.percent) / 100
                }
              />
            </svg>

            <span className="text-2xl font-bold text-white">
              {skill.percent}%
            </span>
          </div>

          {/* Content */}
          <div className="relative mt-6 text-center">
            <h3 className="text-lg font-semibold text-white">
              {skill.name}
            </h3>

            <p className="mt-1 text-sm text-white/60">
              {skill.years} Experience
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}