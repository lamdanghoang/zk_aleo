import Image from "next/image";

interface Item {
  icon: string;
  title: string;
  desc?: string;
}

interface Section {
  title: string;
  desc?: string;
}

interface Props {
  section: Section;
  items: Item[];
}

export default function CustomSection({ section, items }: Props) {
  return (
    <section className="mx-auto py-20 px-4 bg-white rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {section.title}
          </h2>
          {section.desc && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {section.desc}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group space-y-4"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={208}
                  height={208}
                />
              </div>
              <h3 className="text-xl leading-tight max-w-[250px] font-semibold tracking-tighter">
                {item.title}
              </h3>
              {item.desc && (
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
