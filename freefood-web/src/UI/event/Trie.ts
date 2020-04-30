//build a trie for prefix matching

interface TrieTemplate{
    root:any;
    end:number;
}

export default class Trie implements TrieTemplate{
    root:any;
    end:number;
    constructor() {
        this.root = new Map();
        this.end = -1;
    }

    insert(word:string) {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(curNode.has(char))) {
                curNode.set(char, new Map());
            }
            curNode = curNode.get(char);
        }
        curNode.set(this.end, true);
    }

    search(word:string) {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(curNode.has(char))) {
                return false;
            }
            curNode = curNode.get(char);
        }
        if (!(curNode.has(this.end)))
            return false;
        return true;
    }

    startsWith(prefix:string) {
        let curNode = this.root;
        for (let char of prefix) {
            if (!(curNode.has(char))) {
                return false;
            }
            curNode = curNode.get(char);
        }
        return true;
    }

    get_start(prefix:string):string[] {
        function get_key(pre:string, pre_node:any) {
            let result:any[] = [];
            if (pre_node.get(-1)) {
                result.push(pre);
            }
            pre_node.forEach(function (val:any, key:number) {
                if (key !== -1) {
                    result = result.concat(get_key(pre + key, pre_node.get(key)));
                }
            });
            return result
        }

        let res = [];
        if (!this.startsWith(prefix)) {
            return []
        } else if (this.search(prefix)) {
            res.push(prefix);
            return res
        } else {
            let node = this.root;
            for (let i = 0; i < prefix.length; i++) {
                let p = prefix[i];
                node = node.get(p);
            }
            return get_key(prefix, node)
        }
    }
}