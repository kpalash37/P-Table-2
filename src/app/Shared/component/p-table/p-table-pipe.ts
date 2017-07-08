import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'ptablefilter'
})
export class PTableFilterComponent implements PipeTransform {
    transform(ary: any, args: any): any {
      // let filter = args[0].toLocaleLowerCase();
       //return filter ? value.filter(movie=> movie.title.toLocaleLowerCase().indexOf(filter) != -1) : value;
       let execution=false;
        if (args) {
            let filterKeys = Object.keys(ary[0]);
          return  ary.filter(function(item:any, index:any, array:any){ 
                      let returnVal=false;   
                       for(let i=0;i<filterKeys.length;i++){
                            if(item[filterKeys[i]].toLowerCase().includes(args.toLowerCase())){
                                returnVal=true
                            }
                        } 
                        return returnVal;
                });
        } else {
        return ary;
        }
    }
}