const fs = require('fs');
const content = fs.readFileSync('src/components/LandingPage.tsx', 'utf-8');

const extractSection = (name) => {
  const start = content.indexOf(`        {/* ${name} */}`);
  if (start === -1) throw new Error(`Could not find ${name}`);
  const nextSectionEnd = content.indexOf('        </section>', start) + 18;
  return content.slice(start, nextSectionEnd);
};

const hero = extractSection('Hero Section');
const categories = extractSection('Categories Section');
const aiDirector = extractSection('AI Director Section');
const startSimple = extractSection('Start Simple Section');
const safeTrusted = extractSection('Safe and Trusted Section');
const stats = extractSection('Stats Section');
const business = extractSection('For Businesses Section');
const referrConcept = extractSection('Referr Concept Section');
const successStories = extractSection('Success Stories Section');
const banner = extractSection('Freelancers Banner');

const prefix = content.slice(0, content.indexOf('        {/* Hero Section */}'));
const suffix = content.slice(content.indexOf('      </main>'));

const newOrder = [
  hero,
  categories,
  aiDirector,
  startSimple,
  stats,
  successStories,
  business,
  referrConcept,
  safeTrusted,
  banner
];

const newContent = prefix + newOrder.join('\n\n') + '\n' + suffix;

fs.writeFileSync('src/components/LandingPage.tsx', newContent);
console.log('Successfully reordered LandingPage.tsx');
