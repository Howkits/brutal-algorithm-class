//##1 The Matrix Product
function Product(M1,M2){
    resultRow=M1.length
    resultCol=M2[0].length
    M3=[]
    for(let i=0;i<resultRow;i++){    //
        M3.push([])
        for(let j=0;j<resultCol;j++){
            sum=0;
            for(let rowNum=0,colNum=0;rowNum<M1[0].length;rowNum++,colNum++){
                sum+=M1[i][rowNum]*M2[colNum][j];
            }
            M3[i].push(sum)
        }
    }
    return M3
}

//复杂度分析：不妨假设M1，M2两个矩阵分别为L*M，M*N大小，则矩阵乘法得到的矩阵大小为L*N
//外部二重循环建立空结果矩阵时间复杂度O(L*N)
//内部计算各个位置上的数字时间复杂度O(M)
//总的时间复杂度为O(L*N*M)


//##test1
let M1=[[1,2,3],[4,5,6]]
let M2=[[1,2],[3,4],[5,6]]

console.log('M1*M2=',Product(M1,M2))


//##2 Shuffle
function InsertShuffle(remaining){
    function x(Shuffled,remaining){
        if(remaining.length===0){
            return Shuffled
        }
        let pick=Math.floor(Math.random()*(Shuffled.length+1))
        //console.log(pick)
        Shuffled.splice(pick,0,remaining[0])
        remaining.shift()
        //console.log(Shuffled,remaining)
        return x(Shuffled,remaining)
    }
    return x([],remaining)
}

a=[1,2,3,4,5,6,7,8,9,10]
// for(let i=0;i<10;i++){
//     console.log(InsertShuffle([1,2,3,4,5,6,7,8,9,10]))
// }
//console.log(InsertShuffle(a))
//分析：第1个数有1种插入方法，第二个数有2种插入方法，所以第n个数有n种插入方法，一共有n！种打乱情况
//一共有n!种排列所以可以打乱得足够乱
//某个数字出现在所有位置上的情况是相同的均为(n-1)!种，所以可知某个数字出现在各个位置上的概率是相同的
//算法的复杂度计算分析： 最差的情况下插入分别需要1、2、3……n次求和得sum=n(1+n)/2,所以复杂度为O(n^2)

//统计和标准差

function test(f, M) {
    let results = [];
    for (let i = 0; i < M; i++) {
        let array = f([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        results.push(array)
    }

    let stats = [];
    for (let i = 0; i < 10; i++) {
        stats.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    for (let result of results) {
        for (let j = 0; j < result.length; j++) {
            // j // 2
            // result[j] // 3
            // console.log(stats, j, stats[j]);
            if (stats[j][result[j]] === undefined) {
                stats[j][result[j]] = 0;
            } else {
                stats[j][result[j]] += 1;
            }
        }
    }
    return stats;
}

function d(stats, M) {
    M = M / 100
    let sum = 0;
    for (let row of stats) {
        for (let num of row) {
            sum += num / M
        }
    }
    let avg = sum / 100;

    let d_sum = 0;
    for (let row of stats) {
        for (let num of row) {
            d_sum += (num / M  - avg) * (num / M - avg)
        }
    }
    return d_sum / 100;
}

for(let i = 0; i < 5; i++) {
    let M = Math.pow(10, i);
    let t = test(InsertShuffle, M)
    //console.log(M,' sum:',t)
    console.log(M,' standard deviation:',Math.sqrt(d(t, M)))
}


//##3 LinkedList
class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this._length = 0
    }
    // 得到链表长度
    length() {
        return this._length
    }
    // 在链表末尾追加元素      
    append(data) {
        if(!this.tail){
            this.head=new Node(data)
            this.tail=this.head
        }
        else{
            this.tail.append(data)
        }
        this._length+=1
    }
    // 在链表头部追加元素         
    append_head(data) {
        if(this._length===0){
            this.head=new Node(data)
            this.tail=this.head
            this._length+=1
            return
        }
        let newHead=new Node(data)
        newHead.next=this.head
        this.head=newHead
        this._length+=1
    }
    // 在链表 index-1 和 index 之间插入一个元素
    // insert(element, 0) 等于 append_head(element)
    // insert(element, length()) 等于 append(element)    
    insert(data, index) {
        if(index===0){
            this.append_head(data)
            return
        }
        else if(index===this._length){
            this.append(data)
            return
        }
        else
        {
            this.head.insert(data,index-1)
            this._length+=1
        }
    }
    // 得到 index 位的元素
    get(index) {
        if(index >= this.length()){
            throw Error('not found')
        }
        return this.head.get(index);
    }
}

class Node {
    constructor(data) {
        this.data = data
        this.next = null
        //this.length = 1
    }

    append(data) {
        if(this.next){
            return this.next.append(data)
        }
        this.next =new Node(data)
    }

    insert(data,index){
        if(index===0){
            let inNode=new Node(data)
            inNode.next=this.next
            this.next=inNode
            return 
        }
        return this.next.insert(data,index-1)
    }

    get(index){
        console.log(this.data)
        if(index===0){
            return this.data
        }
        return this.next.get(index-1)
    }
}

//复杂度分析
//得到链表长度O(1)
//链表尾部添加元素O(1)
//链表头部添加元素O(1)
//在指定位置插入元素O(n)
//得到index位元素O(n)

//test
let list = new LinkedList();
list.insert(0,0)
list.append(1);
list.insert(10,1)
list.append(2);
list.append(3);
list.append_head(4);
list.append_head(5);
list.append_head(6);
list.insert(7,0)
list.insert(8,7)
list.insert(9,2)

// 最终结果应该为7 6 9 5 4 0 10 1 8 2 3
list.get(10);
console.log('len', list.length());
