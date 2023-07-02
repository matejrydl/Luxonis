import db from './dbs/db.json'
import db1 from './dbs/db1.json'
import db2 from './dbs/db2.json'
import db3 from './dbs/db3.json'
import db4 from './dbs/db4.json'
import db5 from './dbs/db5.json'
import db6 from './dbs/db6.json'
import db7 from './dbs/db7.json'
import db8 from './dbs/db8.json'

export default async function ImportAllData(){
    let counter = 0;
    const dbs = [db,db1,db2,db3,db4,db5,db6,db7,db8]
    dbs.forEach(element => {
        let vars = element;
        vars = vars['_embedded']['estates'];
        for (let i = 0; i < vars.length; i++) {
            counter++;
            const jsonFlat = vars[i]
            const nameSplit = jsonFlat['name'].split('+')
            let size = ''
            if(nameSplit.includes("+"))
            size = nameSplit[0].split(' ')[nameSplit[0].split(' ').length-1]+'+'+nameSplit[1].split(/[  ]+/)[0]
            else if(jsonFlat['name'].includes('unusual'))
            size = 'atypical'
            else size = '6-and-more'
    
            const name = jsonFlat['name']
            const image = jsonFlat['_links']['images'][0]['href']
            const link = 'https://www.sreality.cz/en/detail/sale/flat/'+size+'/'+jsonFlat["seo"]["locality"]+'/'+jsonFlat["hash_id"]
            console.log(name)
            console.log(image)
            console.log(link)
            console.log(counter)
            
            createflat(name,image,link)
        }
    });
}

function createflat(title,image,link) {
    fetch('http://localhost:5000/flats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, image, link}),
    })
      .then(response => {
        return response.text();
      })
  }
function deleteflat() {
    let id = prompt('Enter flat id');
    fetch(`http://localhost:5000/flats/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
  }

  async function sleep(seconds) {
    return new Promise((resolve) =>setTimeout(resolve, seconds * 1000));
    }