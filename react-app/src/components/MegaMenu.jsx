import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const MegaMenuColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-bold text-brand-dark mb-4 uppercase tracking-wider">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="block py-1.5 text-brand-gray hover:text-brand-gold transition-colors duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const MegaMenu = ({ isScrolled }) => {
  return (
    <li className="group relative">
      <a href="#ministries" className={`px-4 py-2 font-semibold flex items-center gap-2 ${isScrolled ? 'text-brand-dark' : 'text-text-light'}`}>
        Ministries <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
      </a>
      <div className="absolute top-full -left-1/2 transform translate-x-[-25%] w-[800px] bg-white shadow-lg rounded-lg p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="grid grid-cols-4 gap-6">
          <MegaMenuColumn title="Community Groups" links={["Men’s Ministry", "Women’s Ministry", "Youth Group", "Seniors Fellowship"]} />
          <MegaMenuColumn title="Outreach" links={["Local Missions", "Global Missions", "Food Pantry", "Community Service"]} />
          <MegaMenuColumn title="Education" links={["Bible Studies", "Sunday School", "New Believers Class", "Theology Seminars"]} />
          <div className="bg-gray-50 p-4 rounded-md">
            <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=400&auto=format&fit=crop" alt="Children's Ministry" className="rounded-md mb-4 w-full" />
            <h4 className="font-bold text-brand-dark mb-2">Children's Ministry</h4>
            <p className="text-sm text-brand-gray mb-4">Programs available for all ages.</p>
            <a href="#" className="font-bold text-brand-gold hover:underline">Learn More &rarr;</a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MegaMenu;
