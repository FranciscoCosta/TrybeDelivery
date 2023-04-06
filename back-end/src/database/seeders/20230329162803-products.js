// test
const productsList = [
  {
    name: 'Brahma 600ml',
    price: 7.5,
    url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
    description: `O malte Pilsner é o responsavel pela leveza, enquanto o malte Munich é o 
    responsavel pelo sabor.O resultado disso é uma cerveja de cor dourada e espuma cremosa.
     Uma cerveja que tem mais sabor, mas ainda mantém a leveza.`,
    volume: '600ml',
    alcohol_content: '4,70%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'Premium American Lager',
  },
  {
    name: 'Skol Lata 250ml',
    price: 2.2,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    description:
      `A clássica redonda que anima qualquer momento. Seu nome vem da palavra escandinava skål,
      que significa “à vossa saúde/à nossa saúde”; expressão comum que antecede brindes.
      É hoje a maior do segmento no mercado brasileiro e a quinta maior do segmento no mundo.
      Cerveja do tipo Pilsen, Skol é uma cerveja clara, com aroma refinado e sabor leve e suave.
      Skol Pilsen é uma típica cerveja clara, com aroma refinado e sabor leve e suave. Seu teor
      de amargor é menos acentuado e seu teor alcoólico é médio.`,
    volume: '250ml',
    alcohol_content: '4,60%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'American Lager',
  },

  {
    name: 'Heineken 600ml',
    price: 7.5,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
    description:
      `Por mais de 150 anos, um compromisso permanente com a pureza e a qualidade fez da Heineken
      a marca de cerveja mais icônica do mundo. Ao ver a estrela vermelha na garrafa verde,
      já sabe que cada gole gelado vai trazer aquele sabor profundamente satisfatório com notas
      frutadas sutis. Uma tradição de sabor que existe há mais de um século e meio graças à
      simplicidade e qualidade dos ingredientes e à atenção meticulosa ao processo de
       fabricação da cerveja.`,
    volume: '600ml',
    alcohol_content: '5,00%',
    ideal_temperature: '3ºC a 5ºC',
    style: 'American Premium Lager',
  },

  {
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    description:
      `Como toda típica cerveja do tipo pilsen, ANTARCTICA é clara e tem baixa fermentação.
      Tem aroma, sabor e amargor suaves. É uma clássica cerveja pilsen que combina tradição
      e qualidade há mais de um século. Leve e Saborosa para celebrar as coisas boas da vida.
      Antarctica surgiu como uma fábrica de gelo e passou a produzir cerveja um ano depois,
      em 1889. É o complemento perfeito para momentos de prazer e para descontrair em boa companhia.
      Seu aroma levemente frutado e o balanço entre a acidez e o dulçor são bastante 
      característicos.`,
    volume: '300ml',
    alcohol_content: '4,70%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'American Lager',
  },

  {
    name: 'Skol 269ml',
    price: 2.19,
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
    description:
    `A clássica redonda que anima qualquer momento. Seu nome vem da palavra escandinava skål,
    que significa “à vossa saúde/à nossa saúde”; expressão comum que antecede brindes.
    É hoje a maior do segmento no mercado brasileiro e a quinta maior do segmento no mundo.
    Cerveja do tipo Pilsen, Skol é uma cerveja clara, com aroma refinado e sabor leve e suave.
    Skol Pilsen é uma típica cerveja clara, com aroma refinado e sabor leve e suave. Seu teor
    de amargor é menos acentuado e seu teor alcoólico é médio.`,
    volume: '269ml',
    alcohol_content: '4,60%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'American Lager',
  },

  {
    name: 'Skol Beats Senses 313ml',
    price: 4.49,
    url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
    description:
      `O azul de Beats Senses desperta os sentidos. Com sabor cítrico, refrescante e surpreendente.
       Beats Senses combina com um copo longo, com gelo e com o clima das baladas.`,
    volume: '313ml',
    alcohol_content: '8,00%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'Drink',
  },

  {
    name: 'Becks 330ml',
    price: 4.99,
    url_image: 'http://localhost:3001/images/becks_330ml.jpg',
    description:
      `Beck’s é uma legítima German Lager Puro Malte, que segue à risca a lei da pureza da cerveja
      alemã desde 1873. Seu IBU (unidade internacional de amargor) é 20. O resultado é uma cerveja
      de amargor intenso, sabor marcante e excepcional pureza.Ela é provocante, 
      cheia de personalidade e com um sabor característico e único.
      A cerveja alemã mais vendida no mundo.`,
    volume: '300ml',
    alcohol_content: '5,00%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'German Pilsner',
  },

  {
    name: 'Brahma Duplo Malte 350ml',
    price: 2.79,
    url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
    description: 
    `O malte Pilsner é o responsavel pela leveza, enquanto o malte Munich é o 
    responsavel pelo sabor.O resultado disso é uma cerveja de cor dourada e espuma cremosa.
     Uma cerveja que tem mais sabor, mas ainda mantém a leveza.`,
    volume: '350ml',
    alcohol_content: '4,70%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'Premium American Lager',
  },

  {
    name: 'Becks 600ml',
    price: 8.89,
    url_image: 'http://localhost:3001/images/becks_600ml.jpg',
    description:
    `Beck’s é uma legítima German Lager Puro Malte, que segue à risca a lei da pureza da cerveja
    alemã desde 1873. Seu IBU (unidade internacional de amargor) é 20. O resultado é uma cerveja
    de amargor intenso, sabor marcante e excepcional pureza.Ela é provocante, 
    cheia de personalidade e com um sabor característico e único.
    A cerveja alemã mais vendida no mundo.`,
    volume: '600ml',
    alcohol_content: '5,00%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'German Pilsner',
  },

  {
    name: 'Skol Beats Senses 269ml',
    price: 3.57,
    url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    description:
    `O azul de Beats Senses desperta os sentidos. Com sabor cítrico, refrescante e surpreendente.
       Beats Senses combina com um copo longo, com gelo e com o clima das baladas.`,
    volume: '269ml',
    alcohol_content: '8,00%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'Drink',
  },

  {
    name: 'Stella Artois 275ml',
    price: 3.49,
    url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
    description:
      `A receita de Stella Artois foi criada como um presente de Natal para os habitantes da 
      pequena cidade de Leuven, na Bélgica. Recebeu o nome de Stella, estrela em Latim.
      Sua receita única produz uma cerveja com aromas suaves e notas maltadas.
      Uma cerveja de sabor intenso e com final suave.`,
    volume: '275ml',
    alcohol_content: '5,00%',
    ideal_temperature: '0ºC a 4ºC',
    style: 'Premium Lager',
  },
];

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products', productsList, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
