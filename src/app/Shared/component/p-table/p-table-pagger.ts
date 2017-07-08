

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10, maximumPaggingDisplay: number = 10) {
        // calculate total pages
        //console.log("totalItems"+totalItems);
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (maximumPaggingDisplay == 5) {
            console.log("currentPage" + currentPage);
            if (totalPages <= 5) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 3) {
                    startPage = 1;
                    endPage = 5;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 4;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 2;
                    endPage = currentPage + 2;
                }
            }
        }else if(maximumPaggingDisplay == 3){
            console.log("currentPage" + currentPage);
            if (totalPages <= 3) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 2) {
                    startPage = 1;
                    endPage = 3;
                } else if (currentPage + 1 >= totalPages) {
                    startPage = totalPages - 2;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 1;
                    endPage = currentPage + 1;
                }
            }
        
        } else {
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }
        }


        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = this.fnArrayrange(startPage, endPage + 1);
        // let pages=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    fnArrayrange(start: any, end: any): any {
        var total: number[] = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i += 1) {
            total.push(i);
        }
        return total;

    }
}