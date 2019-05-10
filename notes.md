

    private details(section, object){
        let items = [];
        for (let key in object) {
            let value = object[key];
            if (value) {
                let label = key.charAt(0).toUpperCase() + key.slice(1);
                items.push({ uri: Uri.parse(path.join('wp://wpcli', section, `${label}: ${value}`)), expandable: false });
            }
        }
        return items;
    }

    private items(section, array){
        let items = [];
        for (let index = 0; index < array.length; index++) {
            const item = array[index];
            items.push({ uri: Uri.parse(path.join('wp://wpcli', section, item) + '#' + index), expandable: true });            
        }
        return items;
    }

    private getElement(element, site){
        if (element.uri.scheme == 'wp') {
            let pieces = element.uri.path.split(path.sep);
            let section = pieces[2];

            switch (section) {
                case 'Info':
                    return this.details(section, site.wpcli.getInfo());
                case 'Post Types':
                    let posttypes = site.wpcli.getPostTypes();
                    if (element.uri.fragment) {
                        return this.details(section, posttypes[element.uri.fragment]);
                    } else {
                        return this.items(section, posttypes.map((type) => (type.name)));
                    }
                case 'Taxonomies':
                    let taxonomies = site.wpcli.getTaxonomies();
                    if (element.uri.fragment) {
                        return this.details(section, taxonomies[element.uri.fragment]);
                    } else {
                        return this.items(section, taxonomies.map((type) => (type.name)));
                    }
                case 'Roles':
                    let roles = site.wpcli.getRoles();
                    if (element.uri.fragment) {
                        return this.details(section, roles[element.uri.fragment]);
                    } else {
                        return this.items(section, roles.map((type) => (type.name)));
                    }
            }
        }

        return [];
    }

    private getSections(site){
        let items = [];

        if (!site.wpcli) return [{ uri: Uri.parse(path.join('wp://wpcli'))}];


        
        // if (site.wpcli.hasInfo()) {
        //     items.push({ uri: Uri.parse(path.join('wp://wpcli', 'Info', 'General')), expandable: true });
        // }

        // if (site.wpcli.hasPostTypes()) {
        //     items.push({ uri: Uri.parse(path.join('wp://wpcli', 'Post Types')), expandable: true });
        // }

        // if (site.wpcli.hasTaxonomies()) {
        //     items.push({ uri: Uri.parse(path.join('wp://wpcli', 'Taxonomies')), expandable: true });
        // }

        // if (site.wpcli.hasRoles()) {
        //     items.push({ uri: Uri.parse(path.join('wp://wpcli', 'Roles')), expandable: true });
        // }

        return items;
    }