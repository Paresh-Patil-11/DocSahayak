import React from "react";
import BlogCard from "./BlogCard";
import NationalityImg from '../../assets/Nationality_Certificate.jpg';
import DomicileImg from '../../assets/Domesile_Certificate.jpg';
import DisabilityImg from '../../assets/Disabiltiy_Certificate.jpg';

const cardData = [
  {
    id: 1,
    serviceType: "aadhar-card",
    title: "Aadhar Card",
    description: "Secure biometric identification with advanced encryption. Your digital identity, protected and verified.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOWfuHK-FsWYdUywV2CSXdOCef1KcatAO5K6IEcz4YxUU29c8kpO51T8Zt-f0vCz61I1E&usqp=CAU",
    processingTime: "15-30 days",
    fee: "₹50"
  },
  {
    id: 2,
    serviceType: "pan-card",
    title: "PAN Card",
    description: "Essential tax identification for seamless financial transactions. Your gateway to financial freedom.",
    image: "https://images.news18.com/ibnkhabar/uploads/2023/09/PAN-Card-2.jpg?impolicy=website&width=640&height=480",
    processingTime: "10-15 days",
    fee: "₹110"
  },
  {
    id: 3,
    serviceType: "voter-id",
    title: "Voter ID Card",
    description: "Exercise your democratic rights with official electoral identification. Your voice, your vote, your power.",
    image: "https://5.imimg.com/data5/SELLER/Default/2021/8/OL/UD/TI/131796387/voter-id-verification-api-500x500.jpeg",
    processingTime: "30-45 days",
    fee: "Free"
  },
  {
    id: 4,
    serviceType: "ayushman-card",
    title: "Ayushman Bharat Health Card",
    description: "Comprehensive healthcare coverage under India's flagship health insurance program. Health security for all.",
    image: "https://img.inextlive.com/inext/2692023/ayush.jpg",
    processingTime: "7-10 days",
    fee: "Free"
  },
  {
    id: 5,
    serviceType: "income-certificate",
    title: "Income Certificate",
    description: "Official income verification for government schemes and benefits. Unlock opportunities with verified income proof.",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/12/365809959/OF/BE/VJ/203648588/income-certificate.png",
    processingTime: "7-14 days",
    fee: "₹30"
  },
  {
    id: 6,
    serviceType: "caste-certificate",
    title: "Caste Certificate",
    description: "Official caste verification for reservation benefits and educational opportunities. Empowering social justice.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjk4opERHFNbnZaYDS020x6aFHrzqxFqV5LA&s",
    processingTime: "15-30 days",
    fee: "₹30"
  },
  {
    id: 7,
    serviceType: "nationality-certificate",
    title: "Nationality Certificate",
    description: "Official proof of Indian nationality for various legal and administrative purposes. Essential for government services and documentation.",
    image: NationalityImg,
    processingTime: "10-20 days",
    fee: "₹40"
  },
  {
    id: 8,
    serviceType: "domicile-certificate",
    title: "Domicile Certificate",
    description: "Proof of residence for state benefits, education, and employment. Establish your legal domicile with ease.",
    image: DomicileImg,
    processingTime: "7-15 days",
    fee: "₹30"
  },
  {
    id: 9,
    serviceType: "disability-certificate",
    title: "Disability Certificate",
    description: "Certification for persons with disabilities to avail government schemes, reservations, and support services.",
    image: DisabilityImg,
    processingTime: "15-30 days",
    fee: "Free"
  },
].filter(card => card.serviceType !== 'pension-welfare-scheme');

const CardData = () => {
  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      {cardData.map((card) => (
        <BlogCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardData;