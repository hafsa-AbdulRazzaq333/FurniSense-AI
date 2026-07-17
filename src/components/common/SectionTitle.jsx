import React from "react";

const SectionTitle = ({ eyebrow, title, description, align = "center" }) => {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B5E3C]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#2D2D2D] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-8 text-[#5F5F5F]">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
