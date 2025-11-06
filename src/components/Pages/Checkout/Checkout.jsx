import React, { useState, useEffect } from 'react';
import { useCart } from '../../../CartContext/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Nav/Nav';
import './Checkout.css';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Federal Capital Territory'
];

const LGA_BY_STATE = {
  'Abia': [`Aba North`, `Aba South`, `Arochukwu`, `Bende`, `Ikwuano`, `Isiala Ngwa North`, `Isiala Ngwa South`, `Isuikwuato`, `Obi Ngwa`, `Ohafia`, `Osisioma Ngwa`, `Ugwunagbo`, `Ukwa East`, `Ukwa West`, `Umuahia North`, `Umuahia South`, `Umu Nneochi`],
  'Adamawa': [`Demsa`, `Fufore`, `Ganye`, `Girei`, `Gombi`, `Guyuk`, `Hong`, `Jada`, `Lamurde`, `Madagali`, `Maiha`, `Mayo-Belwa`, `Michika`, `Mubi North`, `Mubi South`, `Numan`, `Shelleng`, `Song`, `Toungo`, `Yola North`, `Yola South`],
  'Akwa Ibom': [`Abak`, `Eastern Obolo`, `Eket`, `Esit Eket`, `Essien Udim`, `Etim Ekpo`, `Etinan`, `Ibeno`, `Ibesikpo Asutan`, `Ibiono-Ibom`, `Ika`, `Ikono`, `Ikot Abasi`, `Ikot Ekpene`, `Ini`, `Itu`, `Mbo`, `Mkpat-Enin`, `Nsit-Atai`, `Nsit-Ibom`, `Nsit-Ubium`, `Obot Akara`, `Okobo`, `Onna`, `Oron`, `Oruk Anam`, `Udung-Uko`, `Ukanafun`, `Uruan`, `Urue-Offong/Oruko`, `Uyo`],
  'Anambra': [`Aguata`, `Anambra East`, `Anambra West`, `Anaocha`, `Awka North`, `Awka South`, `Ayamelum`, `Dunukofia`, `Ekwusigo`, `Idemili North`, `Idemili South`, `Ihiala`, `Njikoka`, `Nnewi North`, `Nnewi South`, `Ogbaru`, `Onitsha North`, `Onitsha South`, `Orumba North`, `Orumba South`, `Oyi`],
  'Bauchi': [`Alkaleri`, `Bauchi`, `Bogoro`, `Damban`, `Darazo`, `Dass`, `Gamawa`, `Ganjuwa`, `Giade`, `Itas/Gadau`, `Jama'are`, `Katagum`, `Kirfi`, `Misau`, `Ningi`, `Shira`, `Tafawa Balewa`, `Toro`, `Warji`, `Zaki`],
  'Bayelsa': [`Brass`, `Ekeremor`, `Kolokuma/Opokuma`, `Nembe`, `Ogbia`, `Sagbama`, `Southern Ijaw`, `Yenagoa`],
  'Benue': [`Ado`, `Agatu`, `Apa`, `Buruku`, `Gboko`, `Guma`, `Gwer East`, `Gwer West`, `Katsina-Ala`, `Konshisha`, `Kwande`, `Logo`, `Makurdi`, `Obi`, `Ogbadibo`, `Ohimini`, `Oju`, `Okpokwu`, `Oturkpo`, `Tarka`, `Ukum`, `Ushongo`, `Vandeikya`],
  'Borno': [`Abadam`, `Askira/Uba`, `Bama`, `Bayo`, `Biu`, `Chibok`, `Damboa`, `Dikwa`, `Gubio`, `Guzamala`, `Gwoza`, `Hawul`, `Jere`, `Kaga`, `Kala/Balge`, `Konduga`, `Kukawa`, `Kwaya Kusar`, `Mafa`, `Magumeri`, `Maiduguri`, `Marte`, `Mobbar`, `Monguno`, `Ngala`, `Nganzai`, `Shani`],
  'Cross River': [`Abi`, `Akamkpa`, `Akpabuyo`, `Bakassi`, `Bekwarra`, `Biase`, `Boki`, `Calabar Municipal`, `Calabar South`, `Etung`, `Ikom`, `Obanliku`, `Obubra`, `Obudu`, `Odukpani`, `Ogoja`, `Yakuur`, `Yala`],
  'Delta': [`Aniocha North`, `Aniocha South`, `Bomadi`, `Burutu`, `Ethiope East`, `Ethiope West`, `Ika North East`, `Ika South`, `Isoko North`, `Isoko South`, `Ndokwa East`, `Ndokwa West`, `Okpe`, `Oshimili North`, `Oshimili South`, `Patani`, `Sapele`, `Udu`, `Ughelli North`, `Ughelli South`, `Ukwuani`, `Uvwie`, `Warri North`, `Warri South`, `Warri South West`],
  'Ebonyi': [`Abakaliki`, `Afikpo North`, `Afikpo South (Edda)`, `Ezza North`, `Ezza South`, `Ikwo`, `Ishielu`, `Ivo`, `Izzi`, `Ohaozara`, `Ohaukwu`, `Onicha`],
  'Edo': [`Akoko-Edo`, `Egor`, `Esan Central`, `Esan North-East`, `Esan South-East`, `Esan West`, `Etsako Central`, `Etsako East`, `Etsako West`, `Ighebuzor`, `Ikpoba-Okha`, `Orhionmwon`, `Ovia North-East`, `Ovia South-West`, `Owan East`, `Owan West`, `Uhunmwonde`],
  'Ekiti': [`Ado-Ekiti`, `Efon`, `Ekiti East`, `Ekiti South-West`, `Ekiti West`, `Emure`, `Ido-Osi`, `Ijero`, `Ikere`, `Ikole`, `Ilejemeje`, `Ire Ekiti`, `Moba`, `Oye`, `Gbonyin`, `Ise/Orun`, `Oye-Ekiti`],
  'Enugu': [`Aninri`, `Awgu`, `Enugu East`, `Enugu North`, `Enugu South`, `Ezeagu`, `Igbo Etiti`, `Igbo Eze North`, `Igbo Eze South`, `Isi-Uzo`, `Nkanu East`, `Nkanu West`, `Nasukka`, `Oji River`, `Udenu`, `Udi`, `Uzo-Uwani`],
  'Gombe': [`Akko`, `Balanga`, `Billiri`, `Dukku`, `Funakaye`, `Gombe`, `Kaltungo`, `Kwami`, `Nafada`, `Shongom`, `Yamaltu/Deba`],
  'Imo': [`Aboh Mbaise`, `Ahiazu Mbaise`, `Ehime Mbano`, `Ezinihitte`, `Ideato North`, `Ideato South`, `Ikeduru`, `Isiala Mbano`, `Isu`, `Mbaitoli`, `Ngor Okpala`, `Njaba`, `Nkwerre`, `Nwangele`, `Obowo`, `Oguta`, `Ohaji/Egbema`, `Okigwe`, `Orlu`, `Orsu`, `Oru East`, `Oru West`, `Owerri Municipal`, `Owerri North`, `Owerri West`],
  'Jigawa': [`Auyo`, `Babura`, `Biriniwa`, `Birnin Kudu`, `Buji`, `Dutse`, `Gagarawa`, `Garki`, `Gumel`, `Guri`, `Gwaram`, `Hadejia`, `Jahun`, `Kafin Hausa`, `Kaugama`, `Kazaure`, `Kiri Kasama`, `Kiyawa`, `Kudai`, `Maigatari`, `Malam Madori`, `Miga`, `Ringim`, `Roni`, `Sule Tankarkar`, `Taura`, `Yankwashi`],
  'Kaduna': [`Birnin Gwari`, `Chikun`, `Giwa`, `Igabi`, `Ikara`, `Jaba`, `Jema'a`, `Kachia`, `Kaduna North`, `Kaduna South`, `Kagarko`, `Kajuru`, `Kaura`, `Kauru`, `Kubau`, `Kudan`, `Lere`, `Makarfi`, `Sabon Gari`, `Sanga`, `Soba`, `Zangon Kataf`, `Zaria`],
  'Kano': [`Ajingi`, `Albasu`, `Bagwai`, `Bebeji`, `Bichi`, `Bunkure`, `Dala`, `Dambatta`, `Dawakin Kudu`, `Dawakin Tofa`, `Doguwa`, `Fagge`, `Gabasawa`, `Garko`, `Garun Mallam`, `Gaya`, `Gezawa`, `Gwale`, `Gwarzo`, `Kabasa`, `Kano Municipal`, `Karaye`, `Kibiya`, `Kiru`, `Kumbotso`, `Kunchi`, `Kura`, `Madobi`, `Makoda`, `Minjibir`, `Nasarawa`, `Rano`, `Rimin Gado`, `Rogo`, `Shanono`, `Sumaila`, `Takai`, `Tarauni`, `Tofa`, `Tsanyawa`, `Tudun Wada`, `Ungogo`, `Warawa`, `Wudil`],
  'Katsina': [`Bakori`, `Batagarawa`, `Batsari`, `Baure`, `Bindawa`, `Charanchi`, `Dan Musa`, `Dandume`, `Danja`, `Daura`, `Dutsi`, `Dutsin-Ma`, `Faskari`, `Funtua`, `Ingawa`, `Jibia`, `Kafur`, `Kaita`, `Kankara`, `Kankia`, `Katsina`, `Kurfi`, `Kusada`, `Mai'adua`, `Malumfashi`, `Mani`, `Mashi`, `Matazu`, `Musawa`, `Rimi`, `Sabuwa`, `Safana`, `Sandamu`, `Zango`],
  'Kebbi': [`Aleiro`, `Arewa Dandi`, `Argungu`, `Augie`, `Bagudo`, `Birnin Kebbi`, `Bunza`, `Dandi`, `Fakai`, `Gwandu`, `Jega`, `Kalgo`, `Koko/Besse`, `Maiyama`, `Ngaski`, `Sakaba`, `Shanga`, `Suru`, `Wasagu/Danko`, `Yauri`, `Zuru`],
  'Kogi': [`Adavi`, `Ajaokuta`, `Ankpa`, `Bassa`, `Dekina`, `Ibaji`, `Idah`, `Igalamela Odolu`, `Ijumu`, `Kabba/Bunu`, `Kogi`, `Lokoja`, `Mopa-Muro`, `Ofu`, `Ogori/Magongo`, `Okehi`, `Okene`, `Olamaboro`, `Omala`, `Yagba East`, `Yagba West`],
  'Kwara': [`Asa`, `Baruten`, `Edu`, `Ekiti`, `Ifelodun`, `Ilorin East`, `Ilorin South`, `Ilorin West`, `Isin`, `Kaiama`, `Moro`, `Offa`, `Oke Ero`, `Oyun`, `Pategi`],
  'Lagos': [`Agege`, `Ajeromi-Ifelodun`, `Alimosho`, `Amuwo-Odofin`, `Apapa`, `Badagry`, `Epe`, `Eti-Osa`, `Ibeju-Lekki`, `Ifako-Ijaiye`, `Ikeja`, `Ikorodu`, `Kosofe`, `Lagos Island`, `Lagos Mainland`, `Mushin`, `Ojo`, `Oshodi-Isolo`, `Shomolu`, `Surulere`],
  'Nasarawa': [`Akwanga`, `Awe`, `Doma`, `Karun`, `Keana`, `Keffi`, `Kokona`, `Lafia`, `Nasarawa`, `Nasarawa Eggon`, `Obi`, `Toto`, `Wamba`],
  'Niger': [`Agaie`, `Agwara`, `Bida`, `Borgu`, `d/Kogi`, `Gbako`, `Gurara`, `Katcha`, `Kontagora`, `Lapai`, `Lavun`, `Magama`, `Mariga`, `Mashegu`, `Mokwa`, `Munba`, `Paikoro`, `Rafi`, `Rijau`, `Shiroro`, `Suleja`, `Tafa`, `Wushishi`],
  'Ogun': [`Abeokuta North`, `Abeokuta South`, `Ado-Odo/Ota`, `Egbado North`, `Egbado South`, `Ewekoro`, `Ijebu North`, `Ijebu East`, `Ijebu Ode`, `Ikenne`, `Imeko Afon`, `Ipokia`, `Obafemi Owode`, `Odeda`, `Odogbolu`, `Ogun Waterside`, `Remo North`, `Sagamu`, `Yewa North`, `Yewa South`],
  'Ondo': [`Akoko North East`, `Akoko North West`, `Akoko South Akure East`, `Akoko South West`, `Akure North`, `Akure South`, `Ese Odo`, `Idanre`, `Ifedore`, `Ilaje`, `Ile Oluji/Okeigbo`, `Irele`, `Odigbo`, `Okitipupa`, `Ondo East`, `Ondo West`, `Ose`, `Owo`],
  'Osun': [`Aiyedaade`, `Aiyedire`, `Atakumosa East`, `Atakumosa West`, `Bolawaduro`, `Boripe`, `Ede North`, `Ede South`, `Egbedore`, `Ejigbo`, `Ife Central`, `Ife East`, `Ife North`, `Ife South`, `Ifedayo`, `Ifelodun`, `Ila`, `Ilesa East`, `Ilesa West`, `Irepodun`, `Irewole`, `Isokan`, `Iwo`, `Obokun`, `Odo Otin`, `Ola Oluwa`, `Olorunda`, `Oriade`, `Orolu`, `Osogbo`],
  'Oyo': [`Akinyele`, `Atiba`, `Atisbo`, `Egbeda`, `Ibadan North`, `Ibadan North-East`, `Ibadan North-West`, `Ibadan South-East`, `Ibadan South-West`, `Ibarapa Central`, `Ibarapa East`, `Ibarapa North`, `Ido`, `Ifedayo`, `Irepo`, `Iseyin`, `Itesiwaju`, `Iwajowa`, `Kajola`, `Lagelu`, `Ogbomosho North`, `Ogbomosho South`, `Ogo Oluwa`, `Olorunsogo`, `Oluyole`, `Ona Ara`, `Oorelope`, `Ori Ire`, `Oyo West`, `Oyo East`, `Saki East`, `Saki West`, `Surulere`],
  'Plateau': [`Barkin Ladi`, `Bassa`, `Bokkos`, `Jos East`, `Jos North`, `Jos South`, `Kanam`, `Kanke`, `Langtang North`, `Langtang South`, `Mangu`, `Mikang`, `Pankshin`, `Qua'an Pan`, `Riyom`, `Shendam`, `Wase`],
  'Rivers': [`Abua/Odual`, `Ahoada East`, `Ahoada West`, `Akuku-Toru`, `Andoni`, `Asari-Toru`, `Bonny`, `Degema`, `Eleme`, `Emuoha`, `Etche`, `Gokana`, `Ikwerre`, `Khana`, `Obio/Akpor`, `Ogba/Egbema/Ndoni`, `Ogu/Bolo`, `Okrika`, `Omuma`, `Opobo/Nkoro`, `Oyigbo`, `Port Harcourt`, `Tai`],
  'Sokoto': [`Binji`, `Bodinga`, `Dange Shuni`, `Goronyo`, `Gada`, `Illela`, `Kebbe`, `Kware`, `Rabah`, `Sabon Birni`, `Shagari`, `Silame`, `Sokoto North`, `Sokoto South`, `Tambuwal`, `Tangaza`, `Tureta`, `Wamako`, `Wurno`, `Yabo`],
  'Taraba': [`Ardo Kola`, `Bali`, `Donga`, `Gashaka`, `Gassol`, `Ibi`, `Jalingo`, `Karim Lamido`, `Kaufai`, `Lau`, `Sardauna`, `Takum`, `Ussa`, `Wukari`, `Yorro`, `Zing`],
  'Yobe': [`Bade`, `Bursari`, `Damaturu`, `Fika`, `Fune`, `Geidam`, `Gogaram`, `Gulani`, `Gujba`, `Gulani`, `Jakusko`, `Karasuwa`, `Machina`, `Nangere`, `Nguru`, `Potiskum`, `Tarmuwa`, `Yunusari`, `Yusufari`],
  'Zamfara': [`Anka`, `Bakura`, `Birnin Magaji/Kiyaw`, `Bukkuyum`, `Bungudu`, `Gummi`, `Gusau`, `Kaura Namoda`, `Maradun`, `Maru`, `Shinkafi`, `Talata Mafara`, `Tsafe`, `Zurmi`],
  'Federal Capital Territory': [`Abaji`, `Abuja Municipal`, `Bwari`, `Gwagwalada`, `Kuje`, `Kwali`]
};

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
      if (name === 'state') {
        setShippingInfo(prev => ({ ...prev, city: '' }));
      }
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
      if (name === 'state') {
        setBillingInfo(prev => ({ ...prev, city: '' }));
      }
    }
  };

  const handleSameAsShipping = (e) => {
    const isChecked = e.target.checked;
    setBillingInfo(prev => ({ ...prev, sameAsShipping: isChecked }));
    if (isChecked) {
      setBillingInfo(prev => ({
        ...prev,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requiredShippingFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
      const missingShippingFields = requiredShippingFields.filter(field => !shippingInfo[field] || String(shippingInfo[field]).trim() === '');
      
      if (missingShippingFields.length > 0) {
        setError(`Please fill in all required shipping fields: ${missingShippingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      if (!billingInfo.sameAsShipping) {
        const requiredBillingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'];
        const missingBillingFields = requiredBillingFields.filter(field => !billingInfo[field] || String(billingInfo[field]).trim() === '');
        
        if (missingBillingFields.length > 0) {
          setError(`Please fill in all required billing fields: ${missingBillingFields.join(', ')}`);
          setLoading(false);
          return;
        }
      }

      if (!paymentInfo.paymentMethod) {
        setError('Please select a payment method');
        setLoading(false);
        return;
      }

      if (paymentInfo.paymentMethod === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        const missingCardFields = cardFields.filter(field => !paymentInfo[field] || paymentInfo[field].trim() === '');
        
        if (missingCardFields.length > 0) {
          setError(`Please fill in all payment fields: ${missingCardFields.join(', ')}`);
          setLoading(false);
          return;
        }

        const cardNumber = paymentInfo.cardNumber.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19 || !/^\d+$/.test(cardNumber)) {
          setError('Please enter a valid card number (13-19 digits)');
          setLoading(false);
          return;
        }

        if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
          setError('Please enter a valid expiry date (MM/YY)');
          setLoading(false);
          return;
        }

        if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
          setError('Please enter a valid CVV (3-4 digits)');
          setLoading(false);
          return;
        }
      }

      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.thumbnail
        })),
        shippingInfo: {
          ...shippingInfo,
          fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`
        },
        billingInfo: billingInfo.sameAsShipping ? {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country
        } : {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          fullName: `${billingInfo.firstName} ${billingInfo.lastName}`,
          address: billingInfo.address,
          city: billingInfo.city,
          state: billingInfo.state,
          zipCode: billingInfo.zipCode,
          country: billingInfo.country
        },
        paymentInfo: {
          method: paymentInfo.paymentMethod,
          ...(paymentInfo.paymentMethod === 'card' && paymentInfo.cardNumber && {
            cardNumber: paymentInfo.cardNumber.replace(/\s/g, ''),
            expiryDate: paymentInfo.expiryDate,
            cvv: paymentInfo.cvv,
            cardName: paymentInfo.cardName
          })
        },
        pricing: {
          subtotal,
          shipping,
          tax,
          total
        },
        status: 'pending'
      };

      console.log('Creating order:', orderData);
      console.log('Shipping info:', shippingInfo);
      console.log('Billing info:', billingInfo);
      console.log('Payment info:', paymentInfo);
      console.log('Cart items:', cartItems);
      
      if (!orderData.items || orderData.items.length === 0) {
        setError('No items in cart. Please add items before checking out.');
        setLoading(false);
        return;
      }
      
      if (!orderData.shippingInfo.fullName || !orderData.billingInfo.fullName) {
        setError('Missing required shipping or billing information.');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${BASE}/api/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setOrderId(response.data.orderId);
        setOrderSuccess(true);
        clearCart();
        
        setTimeout(() => {
          navigate(`/order-success/${response.data.orderId}`);
        }, 3000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request URL:', error.config?.url);
      console.error('Request method:', error.config?.method);
      console.error('Request data:', error.config?.data);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(`Order creation failed: ${error.response.data.error}`);
      } else if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (error.response?.status === 400) {
        setError('Invalid order data. Please check your information.');
      } else if (error.response?.status === 422) {
        setError('Validation error. Please check all required fields.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later or contact support.');
      } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setError('Unable to connect to server. Please check your internet connection.');
      } else if (error.message.includes('timeout')) {
        setError('Request timeout. Please try again.');
      } else {
        setError(`Order creation failed: ${error.message || 'Unknown error occurred'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <>
        <Navbar />
        <div className="checkout-empty">
          <div className="container py-5 text-center">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before proceeding to checkout.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="container py-5 text-center">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order ID is: <strong>{orderId}</strong></p>
            <p>You will receive a confirmation email shortly.</p>
            <p>Redirecting to order details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 col-lg-4 order-2 mb-4 mb-lg-0">
              <div className="order-summary">
                <h4 className="mb-4">Order Summary</h4>
                
                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <h6>{item.title}</h6>
                        <p>Qty: {item.quantity}</p>
                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="total-row total-final">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="shipping-note">
                    <i className="fas fa-info-circle me-2"></i>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="order-summary-actions">
                  <button
                    type="submit"
                    form="checkout-form"
                    className="btn btn-primary btn-lg complete-order-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock me-2"></i>
                        Complete Order - ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 order-1">
              <div className="checkout-form">
                <h2 className="mb-4">Checkout</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form id="checkout-form" onSubmit={handlePayment}>
                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <h4>Shipping Information</h4>
                    </div>
                    <div className="form-fields-grid">
                      <div className="field-group">
                        <label>First Name <span className="required">*</span></label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Last Name <span className="required">*</span></label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Email <span className="required">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="input-field"
                        />
                      </div>
                      <div className="field-group full-width">
                        <label>Street Address <span className="required">*</span></label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>State <span className="required">*</span></label>
                        <select
                          name="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        >
                          <option value="">Select a state</option>
                          {NIGERIAN_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label>City <span className="required">*</span></label>
                        <select
                          name="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                          disabled={!shippingInfo.state}
                        >
                          <option value="">Select a city</option>
                          {shippingInfo.state && LGA_BY_STATE[shippingInfo.state]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label>ZIP Code <span className="required">*</span></label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-credit-card"></i>
                      </div>
                      <h4>Payment Information</h4>
                    </div>
                    <div className="form-fields-grid">
                      <div className="field-group full-width">
                        <label>Payment Method</label>
                        <select
                          name="paymentMethod"
                          value={paymentInfo.paymentMethod}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          className="input-field"
                        >
                          <option value="card">Credit/Debit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="apple">Apple Pay</option>
                        </select>
                      </div>
                      
                      {paymentInfo.paymentMethod === 'card' && (
                        <>
                          <div className="field-group full-width">
                            <label>Card Number <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                setPaymentInfo(prev => ({ ...prev, cardNumber: formatted }));
                              }}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group">
                            <label>Expiry Date <span className="required">*</span></label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                setPaymentInfo(prev => ({ ...prev, expiryDate: formatted }));
                              }}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group">
                            <label>CVV <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => handleInputChange(e, 'payment')}
                              placeholder="123"
                              maxLength="4"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group full-width">
                            <label>Cardholder Name <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cardName"
                              value={paymentInfo.cardName}
                              onChange={(e) => handleInputChange(e, 'payment')}
                              required
                              className="input-field"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <h4>Billing Information</h4>
                    </div>
                    
                    <div className="checkbox-field">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={billingInfo.sameAsShipping}
                          onChange={handleSameAsShipping}
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">Same as shipping address</span>
                      </label>
                    </div>
                    
                    {!billingInfo.sameAsShipping && (
                      <div className="form-fields-grid">
                        <div className="field-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={billingInfo.firstName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={billingInfo.lastName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group full-width">
                          <label>Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={billingInfo.address}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group">
                          <label>State</label>
                          <select
                            name="state"
                            value={billingInfo.state}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          >
                            <option value="">Select a state</option>
                            {NIGERIAN_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field-group">
                          <label>City</label>
                          <select
                            name="city"
                            value={billingInfo.city}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                            disabled={!billingInfo.state}
                          >
                            <option value="">Select a city</option>
                            {billingInfo.state && LGA_BY_STATE[billingInfo.state]?.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field-group">
                          <label>ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={billingInfo.zipCode}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
