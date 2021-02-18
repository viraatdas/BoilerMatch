const Icon = ({ name } : { name : any}) => {
    const iconsList: any = {
      heart: '\ue800',
      star: '\ue801',
      like: '\u{1F49E}',
      dislike: '\u274c',
      flash: '\ue803',
      marker: '\uf031',
      filter: '\u2699',
      user: '\uf061',
      circle: '\uf039',
      hashtag: '\uf029',
      calendar: '\uf4c5',
      chevronLeft: '\uf004',
      optionsV: '\uf142',
      optionsH: '\uf141',
      chat: '\uf4ac',
      explore: '\uf50d'
    };
  
    let icon = iconsList[name];

    return icon;
  };
  
  export default Icon;